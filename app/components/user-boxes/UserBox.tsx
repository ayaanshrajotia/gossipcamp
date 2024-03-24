"use client";
import { UserBoxPropsType } from "../../utils/definitions";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import Link from "next/link";

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

                <Link
                    href={`/profile/${userName.toLowerCase()}`}
                    className="bg-black text-white text-sm font-bold rounded-full p-1 px-3 flex items-center justify-center w-full hover:bg-white hover:text-black border-1 border-black transition-all duration-75 dark:text-college-dark-gray-1 dark:bg-college-dark-white"
                >
                    View
                </Link>
            </div>
        </div>
    );
}

export default UserBox;
