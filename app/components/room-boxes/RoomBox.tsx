import React from "react";
import { RoomBoxPropsType } from "../../utils/definitions";
import Image from "next/image";

// icons
import { LockClosedIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import PeopleCount from "../PeopleCount";

function RoomBox({
    roomName = "",
    roomId = "",
    textColor,
    className = "",
    isPrivate,
    imgUrl,
    totalParticipants = 0,
    ...props
}: RoomBoxPropsType) {
    return (
        <div
            className={`relative border-1 border-college-bg-grey rounded-xl font-secondary ${textColor} ${className} bg-white p-3 min-w-[200px] transition-all cursor-pointer`}
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
                                    src={imgUrl}
                                    alt="avatar-1"
                                    fill
                                    className="object-cover rounded-full"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-secondary font-extrabold text-lg w-[130px] truncate -mb-1">
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
                <div className="flex justify-between items-end">
                    <PeopleCount
                        width="w-[40px]"
                        height="h-[40px]"
                        margin="-ml-5"
                        totalParticipants={totalParticipants}
                    />
                    <Link
                        href={`/rooms/${roomId}`}
                        className="bg-black text-white text-sm font-semibold rounded-full px-4 flex h-[30px] items-center justify-center"
                    >
                        View
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default RoomBox;
