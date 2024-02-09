import React from "react";
import { ContainerPropsType, RoomPropsType } from "../lib/definitions";
import Image from "next/image";

// icons
import { LockClosedIcon } from "@heroicons/react/24/solid";

function RoomBox({
    children,
    bgColor = "bg-blue-600",
    textColor,
    className = "",
    isPrivate,
    ...props
}: RoomPropsType) {
    return (
        <div
            className={`relative border-1 border-black rounded-xl font-secondary ${textColor} ${className} bg-white p-3 mx-3`}
            style={{ color: textColor }}
            {...props}
        >
            <div className="flex flex-col gap-4">
                {/* Upper div */}
                <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                        <div>
                            <div className="relative h-[45px] w-[45px]">
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
                                @BurgerEater
                            </span>
                            <span className="font-secondary text-gray-500 text-sm">
                                Profile
                            </span>
                        </div>
                    </div>
                    {isPrivate && (
                        <LockClosedIcon className="w-6 h-6 text-red-500" />
                    )}
                </div>
                {/* Lower Div */}
                <div className="flex justify-between">
                    <span>100+ people</span>
                    <button className="bg-black text-white text-xs rounded-lg p-2">
                        View Room
                    </button>
                </div>
            </div>
        </div>
    );
}

export default RoomBox;
