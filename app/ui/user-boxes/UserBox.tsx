import React from "react";
import { UserBoxPropsType } from "../../utils/definitions";
import Image from "next/image";

// icons
import { LockClosedIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import PeopleCount from "../PeopleCount";

function UserBox({
    userName,
    userId,
    bgColor = "bg-blue-600",
    textColor,
    className = "",
    isPrivate,
    ...props
}: UserBoxPropsType) {
    return (
        <div
            className={`relative border-1 border-black rounded-xl font-secondary ${textColor} ${className} bg-white p-3 mx-3 min-w-[150px]`}
            style={{ color: textColor }}
            {...props}
        >
            <div className="flex flex-col gap-4 items-center">
                {/* Upper div */}
                <div className="flex flex-col items-center gap-3">
                    <div>
                        <div className="relative h-[80px] w-[80px]">
                            <Image
                                src="/avatar-1.png"
                                alt="avatar-1"
                                fill
                                className="object-cover rounded-full border-1 border-black"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-secondary font-bold text-base">
                            {userName}
                        </span>
                        <span className="font-secondary text-gray-500 text-sm">
                            @{userId}
                        </span>
                    </div>
                </div>
                {/* Lower Div */}
                <Link
                    href={`/rooms/${userId}`}
                    className="bg-black text-white text-sm rounded-xl p-1 px-3 flex items-center justify-center w-full"
                >
                    View
                </Link>
            </div>
        </div>
    );
}

export default UserBox;
