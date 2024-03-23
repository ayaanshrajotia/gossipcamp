import Image from "next/image";
import React from "react";
import { PeopleCountPropType } from "../utils/definitions";

function PeopleCount({
    width = "w-[50px]",
    height = "h-[50px]",
    margin = "-ml-7",
    totalParticipants = 0,
    className = "",
}: PeopleCountPropType) {
    return (
        <div className={`flex ${className}`}>
            <div className={`relative ${width} ${height}`}>
                <Image
                    src="/images/avatar-1.png"
                    alt="images/avatar-1"
                    sizes="33vw"
                    fill
                    className="object-cover rounded-full"
                />
            </div>
            <div className={`relative ${width} ${height} ${margin}`}>
                <Image
                    src="/images/avatar-2.png"
                    alt="images/avatar-2"
                    sizes="33vw"
                    fill
                    className="object-cover rounded-full"
                />
            </div>
            <div className={`relative ${width} ${height} ${margin}`}>
                <Image
                    src="/images/avatar-3.jpg"
                    alt="images/avatar-3"
                    sizes="33vw"
                    fill
                    className="object-cover rounded-full"
                />
            </div>
            <div
                className={`bg-gray-200 relative ${width} ${height} rounded-full ${margin} flex items-center justify-center dark:bg-college-dark-gray-2 dark:text-college-dark-white`}
            >
                <span className="font-semibold text-sm">
                    +{totalParticipants}
                </span>
            </div>
        </div>
    );
}

export default PeopleCount;
