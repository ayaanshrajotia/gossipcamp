import React from "react";
import { RoomBoxBiggerPropsType } from "../../utils/definitions";
import Image from "next/image";

// icons
import { LockClosedIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import PeopleCount from "../PeopleCount";

function RoomBoxHome({
    roomName,
    roomId,
    bgcolor = "bg-blue-600",
    textColor,
    className = "",
    totalParticipants = 0,
    isPrivate,
    ...props
}: RoomBoxBiggerPropsType) {
    return (
        <div
            className={`relative border-1 rounded-2xl font-secondary ${textColor} ${className} bg-white p-4 min-w-[350px] w-full`}
            style={{ color: textColor }}
            {...props}
        >
            <div className="flex gap-4">
                {/* Image */}
                <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                        <div className="">
                            <div className="relative h-[80px] w-[80px]">
                                <Image
                                    src="/images/avatar-1.png"
                                    alt="avatar-1"
                                    fill
                                    className="object-cover rounded-full border-1 border-black"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-1 flex-col gap-4 w-full">
                    <div className="flex w-full">
                        {/* Details */}
                        <div className="flex justify-between w-full">
                            <div className="flex flex-col">
                                <span className="font-secondary font-extrabold text-xl truncate w-[140px]">
                                    {roomName}
                                </span>
                                <span className="font-secondary text-gray-500 text-base">
                                    @{roomId}
                                </span>
                            </div>
                            {isPrivate && (
                                <LockClosedIcon className="w-6 h-6 text-red-500" />
                            )}
                        </div>
                        <PeopleCount
                            width="w-[40px]"
                            height="h-[40px]"
                            margin="-ml-5"
                            totalParticipants={totalParticipants}
                        />
                    </div>
                    {/* Join */}
                    <div className="flex flex-col justify-between gap-6">
                        <Link
                            href={`/rooms/${roomId}`}
                            className="bg-black text-white text-base font-bold rounded-full hover:bg-white hover:text-black border-1 border-black transition-all py-1.5 px-3 flex items-center justify-center"
                        >
                            Join Room
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RoomBoxHome;
