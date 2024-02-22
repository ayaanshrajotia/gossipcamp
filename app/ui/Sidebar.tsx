"use client";
import React, { useLayoutEffect, useState } from "react";
import RoomBox from "./room-boxes/RoomBox";
import Image from "next/image";

import { BellIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { capitalizeFirstLetter } from "../utils/helper";

export default function Sidebar() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const { fName, lName, avatar } = useSelector(
        (state: RootState) => state.user.profile || ""
    );
    useLayoutEffect(() => {
        setFirstName(fName);
        setLastName(lName);
        setImgUrl(avatar);
    }, [fName, lName, avatar]);

    return (
        <div className="sticky bottom-[200px] w-[340px]">
            <div className=" pt-4 mb-4 mr-6">
                <div className="h-[80px] w-full flex items-center">
                    <div className="flex-1 flex items-center justify-between gap-6">
                        <div className="flex justify-between">
                            <div className="flex gap-2">
                                <div>
                                    <div className="relative h-[45px] w-[45px]">
                                        <Image
                                            src={imgUrl || "/avatar-1.png"}
                                            alt="avatar-1"
                                            fill
                                            className="object-cover rounded-full"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-secondary font-bold text-base">
                                        @{capitalizeFirstLetter(firstName)}
                                        {capitalizeFirstLetter(lastName)}
                                    </span>
                                    <span className="font-secondary text-gray-500 text-sm">
                                        Profile
                                    </span>
                                </div>
                                <ChevronDownIcon className="w-5 h-5 mt-1 self-start" />
                            </div>
                        </div>
                        <div className="border-1 border-gray-200 rounded-full w-[45px] h-[45px] flex items-center justify-center">
                            <BellIcon className="w-6 h-6" />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col mt-2 gap-6 box-border">
                    <div className="flex flex-col gap-6 bg-white border-1 px-6 py-6 rounded-xl box-border box-shadow-yellow-static">
                        <h1 className="text-2xl font-semibold font-secondary">
                            Private Rooms
                        </h1>
                        <div>
                            <RoomBox
                                roomName="LNCT Bhopal"
                                roomId="lnctbhopal"
                                bgColor="bg-college-yellow"
                                textColor="black"
                                isPrivate={true}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-6 bg-white border-1 rounded-xl py-6 box-shadow-yellow-static px-6">
                        <h1 className="text-2xl font-semibold font-secondary">
                            Public Rooms
                        </h1>
                        <div className="flex flex-col gap-6">
                            <RoomBox
                                roomName="Harry Potter"
                                roomId="harrypotter"
                                textColor="black"
                                isPrivate={false}
                            />
                            <RoomBox
                                roomName="Game of Thrones"
                                roomId="gameofthrones"
                                textColor="black"
                                isPrivate={false}
                            />
                            <RoomBox
                                roomName="College Khabar"
                                roomId="collegekhabar"
                                textColor="black"
                                isPrivate={false}
                            />
                            <RoomBox
                                roomName="Game of Thrones"
                                roomId="gameofthrones"
                                textColor="black"
                                isPrivate={false}
                            />
                            <RoomBox
                                roomName="College Khabar"
                                roomId="collegekhabar"
                                textColor="black"
                                isPrivate={false}
                            />
                            <RoomBox
                                roomName="Friends"
                                roomId="friends"
                                textColor="black"
                                isPrivate={false}
                            />{" "}
                            <RoomBox
                                roomName="Game of Thrones"
                                roomId="gameofthrones"
                                textColor="black"
                                isPrivate={false}
                            />
                            <RoomBox
                                roomName="College Khabar"
                                roomId="collegekhabar"
                                textColor="black"
                                isPrivate={false}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
