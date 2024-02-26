import Image from "next/image";
import React from "react";
import PeopleCount from "../PeopleCount";
import Link from "next/link";

function HomeCard() {
    return (
        <div className="bg-white rounded-xl w-[350px] light-shadow font-secondary">
            <div className="p-4">
                <div className="relative h-[200px] w-full mb-1">
                    <Image
                        src={"/images/bg-1.jpg"}
                        alt="avatar-1"
                        fill
                        className="object-cover rounded-xl"
                    />
                </div>
                <div className="p-2 flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        <div className="flex flex-col">
                            <span className="text-xl font-bold">
                                Harry Potter
                            </span>
                            <span className="text-sm">@harrypotter</span>
                        </div>
                        <PeopleCount
                            width="w-[40px]"
                            height="h-[40px]"
                            margin="-ml-5"
                        />
                    </div>
                    <div>
                        <Link
                            href={`/rooms`}
                            className="bg-[#272727] text-white text-sm font-semibold rounded-full p-2.5 px-4 flex items-center justify-center"
                        >
                            View Room
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeCard;
