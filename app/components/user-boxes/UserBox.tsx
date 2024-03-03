"use client";

import React, { useState } from "react";
import { UserBoxPropsType } from "../../utils/definitions";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { toggleFollowUser } from "@/lib/slices/userSlice";
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
        <Link href={`/profile/${userId}`}>
            <div
                className={`relative border-1 rounded-xl font-secondary ${textColor} ${className} bg-white p-4 min-w-[150px] cursor-pointer`}
                style={{ color: textColor }}
                {...props}
            >
                <div className="flex flex-col gap-4 items-center ">
                    {/* Upper div */}
                    <div className="flex flex-col items-center gap-3 w-full">
                        <div>
                            <div className="relative h-[80px] w-[80px]">
                                <Image
                                    src={avatar}
                                    alt="avatar-1"
                                    fill
                                    className="object-cover rounded-full"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col w-full">
                            <p className="font-secondary font-bold text-base truncate text-center">
                                {userName}
                            </p>
                            <span className="font-secondary text-gray-500 text-sm truncate text-center">
                                {followers} Followers
                            </span>
                        </div>
                    </div>
                    {/* Lower Div */}

                    <Link
                        href={`/profile/${userId}`}
                        className="bg-black text-white text-sm font-bold rounded-full p-1.5 px-3 flex items-center justify-center w-full hover:bg-white hover:text-black border-1 border-black transition-all"
                    >
                        View
                    </Link>
                </div>
            </div>
        </Link>
    );
}

export default UserBox;
