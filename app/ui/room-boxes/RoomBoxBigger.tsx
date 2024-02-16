import React from "react";
import { RoomBoxBiggerPropsType } from "../../utils/definitions";
import Image from "next/image";

// icons
import { LockClosedIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import PeopleCount from "../PeopleCount";

function RoomBoxBigger({
    roomName,
    roomId,
    bgColor = "bg-blue-600",
    textColor,
    className = "",
    isPrivate,
    ...props
}: RoomBoxBiggerPropsType) {
    return (
        <div
            className={`relative border-1 border-black rounded-2xl font-secondary ${textColor} ${className} bg-white p-4 min-w-fit`}
            style={{ color: textColor }}
            {...props}
        >
            <div className="flex gap-4">
                {/* Image */}
                <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                        <div>
                            <div className="relative h-[100px] w-[100px]">
                                <Image
                                    src="/avatar-1.png"
                                    alt="avatar-1"
                                    fill
                                    className="object-cover rounded-full border-1 border-black"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/* Details */}
                <div className="flex flex-1 flex-col justify-between">
                    <div className="flex flex-col">
                        <span className="font-secondary font-bold text-2xl">
                            {roomName}
                        </span>
                        <span className="font-secondary text-gray-500 text-base">
                            @{roomId}
                        </span>
                    </div>
                    <p className="leading-tight mt-2">
                        This room is for the Harry Potter fans. Join this room
                        to diversify the mantras of the magical...
                    </p>
                    {isPrivate && (
                        <LockClosedIcon className="w-6 h-6 text-red-500" />
                    )}
                </div>
                {/* Join */}
                <div className="flex flex-col justify-between gap-6">
                    <PeopleCount
                        width="w-[50px]"
                        height="h-[50px]"
                        margin="-ml-7"
                    />
                    <Link
                        href={`/rooms/${roomId}`}
                        className="bg-black text-white text-base rounded-xl p-2 px-3 flex items-center justify-center"
                    >
                        Join Room
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default RoomBoxBigger;
