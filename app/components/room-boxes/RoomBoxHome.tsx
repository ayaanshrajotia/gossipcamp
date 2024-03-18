import React from "react";
import { RoomBoxBiggerPropsType } from "../../utils/definitions";
import Image from "next/image";

// icons
import { LockClosedIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import PeopleCount from "../PeopleCount";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import {
    getAllRooms,
    getPublicJoinedRooms,
    toggleFollowRoom,
} from "@/lib/slices/roomSlice";
import toast from "react-hot-toast";
import { capitalizeFirstLetter } from "@/app/utils/helper";
import { joinRoomEmitter } from "@/lib/slices/socketSlice";

function RoomBoxHome({
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
    const {
        _id: profileId,
        fName,
        lName,
    } = useSelector((state: RootState) => state.auth.profile);

    const handleJoinRoom = async () => {
        try {
            const response = await dispatch(toggleFollowRoom(roomId));

            if (response.meta.requestStatus === "rejected") {
                throw new Error(response.payload);
            } else {
                await dispatch(getPublicJoinedRooms());
                await dispatch(getAllRooms());
                router.push(`/rooms/${roomId}`);
                const capitalizedName =
                    capitalizeFirstLetter(fName) + capitalizeFirstLetter(lName);
                dispatch(
                    joinRoomEmitter({
                        profileId,
                        roomId,
                        username: capitalizedName,
                    })
                );
                toast.success("Joined Room");
            }

            // redirect to room page
        } catch (err: any) {
            toast.error(err.message);
        }
    };
    return (
        <div
            className={`relative border-1 rounded-2xl font-secondary ${textColor} ${className} bg-white p-4 min-w-[350px] overflow-hidden`}
            style={{ color: textColor }}
            {...props}
        >
            <div className="flex gap-4">
                {/* Image */}
                <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                        <div className="">
                            <div className="relative h-[80px] w-[80px]">
                                <Image
                                    src={roomDP}
                                    alt="avatar-1"
                                    sizes="33vw"
                                    fill
                                    className="object-cover rounded-full "
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-1 flex-col gap-1 w-full">
                    <div className="flex w-full">
                        {/* Details */}
                        <div className="flex justify-between w-full">
                            <div className="flex flex-col">
                                <span className="font-secondary font-extrabold text-xl text-ellipsis overflow-hidden line-clamp-1">
                                    {roomName}
                                </span>
                                <span className="font-secondary text-gray-500 text-sm text-ellipsis overflow-hidden line-clamp-1">
                                    @{roomUsername}
                                </span>
                            </div>
                            {isPrivate && (
                                <LockClosedIcon className="w-6 h-6 text-red-500" />
                            )}
                        </div>
                        <PeopleCount
                            width="w-[35px]"
                            height="h-[35px]"
                            margin="-ml-4"
                            totalParticipants={totalParticipants}
                        />
                    </div>
                    {/* Join */}
                    <div className="flex justify-between items-center gap-6 w-full">
                        <p className="text-ellipsis overflow-hidden line-clamp-1">
                            {roomDescription}
                        </p>
                        <button
                            className="bg-black text-white font-bold text-sm rounded-full hover:bg-white hover:text-black border-1 border-black transition-all py-1 px-3 min-w-fit self-end"
                            onClick={() => handleJoinRoom()}
                        >
                            Join Room
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RoomBoxHome;
