import { RoomBoxPropsType } from "../../utils/definitions";
import Image from "next/image";

import Link from "next/link";
import PeopleCount from "../PeopleCount";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

function RoomBox({
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
    closeMenuFn,
    ...props
}: RoomBoxPropsType) {
    const { profile, loading } = useSelector((state: RootState) => state.auth);

    // const dispatch = useDispatch<AppDispatch>();
    // const handleJoinRoom = async () => {
    //     try {
    //         dispatch(
    //             addPublicJoinedRoom({
    //                 roomId,
    //                 roomType,
    //                 roomName,
    //                 roomUsername,
    //                 roomDP,
    //                 roomDescription,
    //                 totalParticipants,
    //             })
    //         );
    //         dispatch(removePublicJoinedRoom(roomId));
    //         dispatch(removePublicJoinedRoom(roomId));
    //         const response = await dispatch(toggleFollowRoom(roomId));

    //         if (response.meta.requestStatus === "rejected") {
    //             throw new Error(response.payload);
    //         } else {
    //             // await dispatch(toggleFollowRoom(roomId));
    //         }

    //         // redirect to room page
    //     } catch (err: any) {
    //         toast.error(err.message);
    //     }
    // };
    return (
        <div
            className={`relative border-1 rounded-xl font-secondary ${textColor} ${className} bg-white p-4 min-w-[200px] transition-all cursor-pointer dark:bg-college-dark-gray-2 dark:border-college-dark-gray-3`}
            style={{ color: textColor }}
            {...props}
        >
            <div className="flex flex-col gap-4">
                {/* Upper div */}
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div>
                            <div className="relative h-[45px] w-[45px]">
                                <Image
                                    src={roomDP}
                                    alt="avatar-1"
                                    fill
                                    sizes="33vw"
                                    className="object-cover rounded-full"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col self-start">
                            <span className="font-secondary font-extrabold text-lg w-[130px] truncate -mb-1 dark:text-college-dark-white">
                                {roomName}
                            </span>
                            <span className="font-secondary text-sm  text-college-dark-white-2">
                                @{roomUsername}
                            </span>
                        </div>
                    </div>
                    {/* {isPrivate && (
                        <LockClosedIcon className="w-6 h-6 text-red-500" />
                    )} */}
                </div>
                {/* Lower Div */}
                <div className="flex justify-between items-end">
                    <PeopleCount
                        width="w-[35px]"
                        height="h-[35px]"
                        margin="-ml-5"
                        totalParticipants={totalParticipants}
                    />
                    {profile === null ? (
                        <motion.button
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{
                                type: "spring",
                                stiffness: 600,
                                damping: 20,
                            }}
                            className="bg-black text-white text-sm font-bold rounded-full hover:bg-white hover:text-black border-1 border-black transition-all py-1  px-3 flex items-center justify-center dark:text-college-dark-gray-1 dark:bg-college-dark-white"
                            onClick={() =>
                                toast.error("Please create your profile")
                            }
                        >
                            Open
                        </motion.button>
                    ) : (
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
                                className="bg-black text-white text-sm font-bold rounded-full hover:bg-white hover:text-black border-[1px] border-black transition-all py-1  px-3 flex items-center justify-center dark:text-college-dark-gray-1 dark:bg-college-dark-white dark:hover:bg-college-dark-gray-2 dark:hover:text-college-dark-white dark:hover:border-college-dark-white"
                                href={`/rooms/${roomId}`}
                                onClick={closeMenuFn}
                            >
                                Open
                            </Link>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default RoomBox;
