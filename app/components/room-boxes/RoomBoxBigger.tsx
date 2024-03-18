import React from "react";
import { RoomBoxBiggerPropsType } from "../../utils/definitions";
import Image from "next/image";
import PeopleCount from "../PeopleCount";
import { AppDispatch, RootState } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";
import {
    getAllRooms,
    getPublicJoinedRooms,
    toggleFollowRoom,
} from "@/lib/slices/roomSlice";
import toast from "react-hot-toast";

// icons
import { LockClosedIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { joinRoomEmitter } from "@/lib/slices/socketSlice";
import { capitalizeFirstLetter } from "@/app/utils/helper";

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
    const {
        _id: profileId,
        username,
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
                                    sizes="33vw"
                                    alt="avatar-1"
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
                        <div className="flex w-full gap-4">
                            <div className="flex flex-col">
                                <span className="font-secondary font-extrabold text-xl text-ellipsis overflow-hidden line-clamp-1">
                                    {roomName}
                                </span>
                                <span className="font-secondary text-gray-500 text-sm text-ellipsis overflow-hidden line-clamp-1">
                                    @{roomUsername}
                                </span>
                            </div>
                            {isPrivate && (
                                <LockClosedIcon className="w-5 h-5 text-red-500 mt-1.5" />
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
                        {isPrivate ? (
                            <button className="bg-black text-white font-bold text-sm rounded-full hover:bg-white hover:text-black border-1 border-black transition-all py-1 px-3 min-w-fit self-end">
                                View Room
                            </button>
                        ) : (
                            <button
                                className="bg-black text-white font-bold text-sm rounded-full hover:bg-white hover:text-black border-1 border-black transition-all py-1 px-3 min-w-fit self-end"
                                onClick={() => handleJoinRoom()}
                            >
                                Join Room
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RoomBoxBigger;
