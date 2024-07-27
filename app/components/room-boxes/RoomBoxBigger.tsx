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
import Link from "next/link";
import { motion } from "framer-motion";

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
    const { profile } = useSelector((state: RootState) => state.auth);
    const { _id, username, fName, lName } = useSelector(
        (state: RootState) => state.auth.profile || {}
    );

    const handleJoinRoom = async (e: React.MouseEvent) => {
        e.stopPropagation();
        try {
            if (!profile) {
                toast.error("Please create profile to join room");
                return;
            }
            const response = await dispatch(toggleFollowRoom(roomId));

            if (response.meta.requestStatus === "rejected") {
                throw new Error(response.payload);
            } else {
                toast.success("Joined Room");
                await dispatch(getPublicJoinedRooms());
                await dispatch(getAllRooms());
                const capitalizedName =
                    capitalizeFirstLetter(fName) + capitalizeFirstLetter(lName);
                dispatch(
                    joinRoomEmitter({
                        profileId: _id,
                        roomId,
                        username: capitalizedName,
                    })
                );
                router.push(`/rooms/${roomId}`);
            }

            // redirect to room page
        } catch (err: any) {
            toast.error(err.message);
        }
    };

    const handleViewRoom = () => {
        router.push(`/rooms/profile/${roomId}`);
    };

    return (
        <div
            className={`max-[550px]:min-w-[150px] relative border-1 rounded-2xl font-secondary ${textColor} ${className} bg-white p-4 min-w-[350px] overflow-hidden dark:bg-college-dark-gray-2 dark:border-college-dark-gray-3 cursor-pointer`}
            style={{ color: textColor }}
            {...props}
        >
            <div
                className="max-[550px]:flex-col flex gap-4 max-[550px]:items-center"
                onClick={handleViewRoom}
            >
                {/* Image */}
                <div className="max-[550px]:gap-4 flex justify-between items-center">
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
                        <div className="max-[550px]:justify-center flex w-full gap-4">
                            <div className="max-[300px]:flex max-[550px]:hidden max-[550px]:items-center max-[550px]:gap-0 max-[550px]:flex-col  flex flex-col">
                                <span className="max-[550px]:text-2xl font-secondary font-extrabold text-xl text-ellipsis overflow-hidden line-clamp-1 dark:text-college-dark-white">
                                    {roomName}
                                </span>
                                <span className="font-secondary text-college-dark-white-2 text-sm text-ellipsis overflow-hidden line-clamp-1">
                                    @{roomUsername}
                                </span>
                            </div>
                            {/* {isPrivate && (
                                <LockClosedIcon className="w-5 h-5 text-red-500 mt-1.5" />
                            )} */}
                        </div>
                        <PeopleCount
                            width="w-[35px]"
                            height="h-[35px]"
                            margin="-ml-4"
                            totalParticipants={totalParticipants}
                            className=""
                        />
                    </div>
                    {/* Join */}
                    <div className="max-[550px]:mt-2 max-[550px]:gap-2 max-[550px]:flex-col flex justify-between gap-6 w-full items-end">
                        <p className="max-[550px]:text-center text-ellipsis overflow-hidden line-clamp-1 dark:text-college-dark-white ">
                            {roomDescription}
                        </p>
                        {isPrivate ? (
                            <motion.div
                                whileHover={{ scale: 1.08 }}
                                whileTap={{ scale: 0.9 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 600,
                                    damping: 20,
                                }}
                            >
                                <Link
                                    passHref
                                    href={`/rooms/profile/${roomId}`}
                                    className="max-[550px]:w-full flex justify-center bg-black text-white font-bold text-sm rounded-full hover:bg-white hover:text-black border-1 border-black transition-all py-1 px-3 min-w-fit self-end dark:bg-college-dark-white dark:text-college-dark-black dark:hover:bg-college-dark-gray-2 dark:hover:text-college-dark-white dark:hover:border-college-dark-white"
                                >
                                    View Room
                                </Link>
                            </motion.div>
                        ) : (
                            <motion.button
                                whileHover={{ scale: 1.08 }}
                                whileTap={{ scale: 0.9 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 600,
                                    damping: 20,
                                }}
                                className="max-[550px]:w-full bg-black text-white font-bold text-sm rounded-full hover:bg-white hover:text-black border-[1px] border-black transition-all py-1 px-3 min-w-fit self-end dark:bg-college-dark-white dark:text-college-dark-black dark:hover:bg-college-dark-gray-2 dark:hover:text-college-dark-white dark:hover:border-college-dark-white  duration-[20ms]"
                                onClick={(e) => handleJoinRoom(e)}
                            >
                                Join Room
                            </motion.button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RoomBoxBigger;
