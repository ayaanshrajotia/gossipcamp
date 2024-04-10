"use client";
import { UserBoxPropsType } from "../../utils/definitions";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import Link from "next/link";
import { motion } from "framer-motion";

// icons

function UserBox({
    userName,
    followers,
    userId,
    profileId,
    bgcolor = "bg-blue-600",
    textColor,
    className = "",
    isPrivate,
    avatar,
    isFollowing,
    ...props
}: UserBoxPropsType) {
    const dispatch = useDispatch<AppDispatch>();

    return (
        <div
            className={`relative border-1 rounded-xl font-secondary ${textColor} ${className} bg-white p-4 min-w-[150px] cursor-pointer dark:bg-college-dark-gray-2 dark:border-college-dark-gray-3`}
            style={{ color: textColor }}
            {...props}
        >
            <div className="flex flex-col gap-4 items-center ">
                {/* Upper div */}
                <div className="flex flex-col items-center gap-3 w-full">
                    <div>
                        <div className="relative h-[75px] w-[75px]">
                            <Image
                                src={avatar}
                                alt="avatar-1"
                                sizes="33vw"
                                fill
                                className="object-cover rounded-full"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col w-full">
                        <p className="font-secondary font-bold text-base truncate text-center dark:text-college-dark-white">
                            {userName}
                        </p>
                        <span className="font-secondary text-sm truncate text-center text-college-dark-white-2">
                            {followers} Followers
                        </span>
                    </div>
                </div>
                {/* Lower Div */}
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{
                        type: "spring",
                        stiffness: 600,
                        damping: 20,
                    }}
                    className="w-full"
                >
                    <Link
                        href={`/profile/${userName.toLowerCase()}`}
                        className="bg-black text-white text-sm font-bold rounded-full p-1 px-3 flex items-center justify-center w-full hover:bg-white hover:text-black border-[1px] border-black transition-all duration-75 dark:bg-college-dark-white dark:text-college-dark-black dark:hover:bg-college-dark-gray-2 dark:hover:text-college-dark-white dark:hover:border-college-dark-white"
                    >
                        View
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}

export default UserBox;
