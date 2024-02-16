import Image from "next/image";
import React from "react";
import { PeopleCountPropType } from "../utils/definitions";

function PeopleCount({
    width = "w-[50px]",
    height = "h-[50px]",
    margin = "-ml-7",
}: PeopleCountPropType) {
    return (
        <div className="flex">
            <div className={`relative ${width} ${height}`}>
                <Image
                    src="/avatar-1.png"
                    alt="avatar-1"
                    fill
                    className="object-cover rounded-full"
                />
            </div>
            <div className={`relative ${width} ${height} ${margin}`}>
                <Image
                    src="/avatar-2.png"
                    alt="avatar-2"
                    fill
                    className="object-cover rounded-full"
                />
            </div>
            <div className={`relative ${width} ${height} ${margin}`}>
                <Image
                    src="/avatar-3.jpg"
                    alt="avatar-3"
                    fill
                    className="object-cover rounded-full"
                />
            </div>
            <div
                className={`bg-gray-200 relative ${width} ${height} rounded-full ${margin} flex items-center justify-center`}
            >
                <span className="font-semibold text-sm">+100</span>
            </div>
        </div>
    );
}

export default PeopleCount;
