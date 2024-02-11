import React from "react";
import { RoomBoxPropsType } from "../../lib/definitions";
import Image from "next/image";

// icons
import { LockClosedIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import PeopleCount from "../PeopleCount";

function RoomBox({
    roomName,
    roomId,
    bgColor = "bg-blue-600",
    textColor,
    className = "",
    isPrivate,
    ...props
}: RoomBoxPropsType) {
    return (
        <div
            className={`relative border-1 border-black rounded-xl font-secondary ${textColor} ${className} bg-white p-3 mx-3 min-w-fit`}
            style={{ color: textColor }}
            {...props}
        >
            <div className="flex flex-col gap-4">
                {/* Upper div */}
                <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                        <div>
                            <div className="relative h-[40px] w-[40px]">
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
                                {roomName}
                            </span>
                            <span className="font-secondary text-gray-500 text-sm">
                                @{roomId}
                            </span>
                        </div>
                    </div>
                    {isPrivate && (
                        <LockClosedIcon className="w-6 h-6 text-red-500" />
                    )}
                </div>
                {/* Lower Div */}
                <div className="flex justify-between">
                    <PeopleCount
                        width="w-[40px]"
                        height="h-[40px]"
                        margin="-ml-5"
                    />
                    <Link
                        href={`/rooms/${roomId}`}
                        className="bg-black text-white text-sm rounded-xl p-1 px-3 flex items-center justify-center"
                    >
                        View
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default RoomBox;
