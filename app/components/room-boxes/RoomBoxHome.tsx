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
    const { _id, fName, lName } = useSelector(
        (state: RootState) => state.auth.profile || {}
    );

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
                        profileId: _id,
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
            className={`max-[550px]:min-w-[150px] relative border-1 rounded-2xl font-secondary ${textColor} ${className} bg-white p-4 min-w-[350px] overflow-hidden dark:bg-college-dark-gray-2 dark:border-college-dark-gray-3`}
            style={{ color: textColor }}
            {...props}
        >
            <div className="max-[550px]:flex-col flex gap-4 max-[550px]:items-center">
                {/* Image */}
                <div className="max-[550px]:gap-4 flex justify-between items-center">
                    <div className="flex gap-2">
                        {/* <div className=""> */}
                        <div className="relative h-[80px] w-[80px]">
                            <Image
                                src={roomDP}
                                alt="avatar-1"
                                sizes="33vw"
                                fill
                                className="object-cover rounded-full "
                            />
                        </div>
                        {/* </div> */}
                    </div>
                    <div className="max-[300px]:hidden min-[550px]:hidden max-[550px]:gap-0 max-[550px]:flex-col  flex flex-col">
                        <span className=" max-[550px]:text-2xl font-secondary font-extrabold text-xl text-ellipsis overflow-hidden line-clamp-1 dark:text-college-dark-white">
                            {roomName}
                        </span>
                        <span className="font-secondary text-sm text-ellipsis overflow-hidden line-clamp-1 text-college-dark-white-2">
                            @{roomUsername}
                        </span>
                    </div>
                </div>
                <div className="flex flex-1 flex-col gap-1 w-full">
                    <div className="max-[550px]:items-center max-[550px]:flex-col max-[550px]:gap-2 flex w-full">
                        {/* Details */}
                        <div className="max-[550px]:justify-center flex justify-between w-full">
                            <div className="max-[300px]:flex max-[550px]:hidden max-[550px]:items-center max-[550px]:gap-0 max-[550px]:flex-col  flex flex-col">
                                <span className="max-[550px]:text-2xl font-secondary font-extrabold text-xl text-ellipsis overflow-hidden line-clamp-1 dark:text-college-dark-white">
                                    {roomName}
                                </span>
                                <span className="font-secondary text-sm text-ellipsis overflow-hidden line-clamp-1 text-college-dark-white-2">
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
                    <div className="max-[550px]:mt-2 max-[550px]:gap-2 max-[550px]:flex-col flex justify-between gap-6 w-full items-end">
                        <p className="max-[550px]:text-center text-ellipsis overflow-hidden line-clamp-1 dark:text-college-dark-white ">
                            {roomDescription}
                        </p>
                        <button
                            className="max-[550px]:w-full bg-black text-white font-bold text-sm rounded-full hover:bg-white hover:text-black border-1 border-black transition-all py-1 px-3 min-w-fit self-end dark:bg-college-dark-white dark:text-college-dark-black dark:hover:bg-college-dark-black dark:hover:text-college-dark-white"
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
