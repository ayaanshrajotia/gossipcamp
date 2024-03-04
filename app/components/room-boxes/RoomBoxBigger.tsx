import React from "react";
import { RoomBoxBiggerPropsType } from "../../utils/definitions";
import Image from "next/image";
import PeopleCount from "../PeopleCount";
import { AppDispatch } from "@/lib/store";
import { useDispatch } from "react-redux";
import {
    addPublicJoinedRoom,
    getAllRooms,
    getPublicJoinedRooms,
    removePublicJoinedRoom,
    toggleFollowRoom,
} from "@/lib/slices/roomSlice";
import toast from "react-hot-toast";

// icons
import { LockClosedIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

function RoomBoxBigger({
    roomId,
    roomType,
    roomName,
    roomUsername,
    bgcolor = "bg-blue-600",
    textColor,
    className = "",
    isPrivate,
    roomDescription,
    totalParticipants,
    roomDP,
    ...props
}: RoomBoxBiggerPropsType) {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    const handleJoinRoom = async () => {
        try {
            // dispatch(
            //     addPublicJoinedRoom({
            //         roomId,
            //         roomType,
            //         roomName,
            //         roomUsername,
            //         roomDP,
            //         roomDescription,
            //         totalParticipants,
            //     })
            // );
            // dispatch(removePublicJoinedRoom(roomId));
            const response = await dispatch(toggleFollowRoom(roomId));

            if (response.meta.requestStatus === "rejected") {
                throw new Error(response.payload);
            } else {
                // await dispatch(toggleFollowRoom(roomId));
                await dispatch(getPublicJoinedRooms());
                router.push(`/rooms/${roomId}`);
                toast.success("Joined Room");
            }

            // redirect to room page
        } catch (err: any) {
            toast.error(err.message);
        }
    };

    return (
        <div
            className={`relative border-1 rounded-2xl font-secondary ${textColor} ${className} bg-white p-4 min-w-fit`}
            style={{ color: textColor }}
            {...props}
        >
            <div className="flex gap-4">
                {/* Image */}
                <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                        <div>
                            <div className="relative h-[70px] w-[70px]">
                                <Image
                                    src={roomDP}
                                    alt="avatar-1"
                                    fill
                                    className="object-cover rounded-full"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/* Details */}
                <div className="flex flex-1 flex-col justify-between">
                    <div className="flex flex-col">
                        <span className="font-secondary font-extrabold text-xl">
                            {roomName}
                        </span>
                        <span className="font-secondary text-gray-500 text-sm">
                            @{roomUsername}
                        </span>
                    </div>
                    <p className="leading-tight text-sm">{roomDescription}</p>
                    {isPrivate && (
                        <LockClosedIcon className="w-6 h-6 text-red-500" />
                    )}
                </div>
                {/* Join */}
                <div className="flex flex-col justify-between gap-4">
                    <PeopleCount
                        width="w-[40px]"
                        height="h-[40px]"
                        margin="-ml-5"
                        totalParticipants={totalParticipants}
                    />
                    {roomType === "User" ? (
                        <button
                            className="bg-black text-white text-sm font-bold rounded-xl py-1.5 px-3 flex items-center justify-center hover:bg-white hover:text-black border-1 border-black transition-all"
                            onClick={() => handleJoinRoom()}
                        >
                            Join Room
                        </button>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </div>
    );
}

export default RoomBoxBigger;
