"use client";
import React, { useEffect, useLayoutEffect, useState } from "react";
import RoomBox from "./room-boxes/RoomBox";
import Image from "next/image";

import { BellIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { capitalizeFirstLetter } from "../utils/helper";
import {
    getPrivateJoinedRooms,
    getPublicJoinedRooms,
} from "@/lib/slices/roomSlice";
import { Span } from "next/dist/trace";
import Link from "next/link";

export default function Sidebar() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [imgUrl, setImgUrl] = useState("");

    const { fName, lName, avatar } = useSelector(
        (state: RootState) => state.user.profile || ""
    );
    const { privateRoom, publicRooms } = useSelector(
        (state: RootState) => state.rooms
    );
    const dispatch = useDispatch<AppDispatch>();

    useLayoutEffect(() => {
        setFirstName(fName);
        setLastName(lName);
        setImgUrl(avatar);
        dispatch(getPrivateJoinedRooms());
        dispatch(getPublicJoinedRooms());
    }, [fName, lName, avatar]);

    console.log(publicRooms);
    console.log(privateRoom);

    return (
        <div className="fixed top-0 bottom-0 right-0 overflow-auto w-[340px] pl-4">
            <div className=" pt-4 mb-4 mr-6">
                <div className="h-[70px] w-full flex items-center">
                    <div className="flex-1 flex items-center justify-between gap-6">
                        <div className="flex justify-between cursor-pointer">
                            <div className="flex gap-2">
                                <div>
                                    <div className="relative h-[45px] w-[45px]">
                                        <Image
                                            src={
                                                imgUrl || "/images/avatar-1.png"
                                            }
                                            alt="avatar-1"
                                            fill
                                            className="object-cover rounded-full"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-secondary font-extrabold text-base">
                                        @{capitalizeFirstLetter(firstName)}
                                        {capitalizeFirstLetter(lastName)}
                                    </span>
                                    <span className="font-secondary text-gray-500 text-sm">
                                        Profile
                                    </span>
                                </div>
                                {/* <ChevronDownIcon className="w-5 h-5 mt-1 self-start cursor-pointer" /> */}
                            </div>
                        </div>
                        <div className="border-1 border-gray-200 rounded-full w-[45px] h-[45px] flex items-center justify-center">
                            <Link href={"/notifications"}>
                                <BellIcon className="w-6 h-6" />
                            </Link>
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
                                roomName={privateRoom?.roomName}
                                roomId={privateRoom?.roomUsername}
                                imgUrl={
                                    privateRoom?.roomDP ||
                                    "/images/avatar-1.png"
                                }
                                bgColor="bg-college-yellow"
                                textColor="black"
                                isPrivate={true}
                                totalParticipants={
                                    privateRoom?.totalParticipants
                                }
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-6 bg-white border-1 rounded-xl py-6 box-shadow-yellow-static px-6">
                        <h1 className="text-2xl font-semibold font-secondary">
                            Public Rooms
                        </h1>
                        <div className="flex flex-col gap-6">
                            {publicRooms?.length > 0 ? (
                                publicRooms?.map((room: any) => (
                                    <RoomBox
                                        key={room.roomId}
                                        roomName="Harry Potter"
                                        roomId="harrypotter"
                                        textColor="black"
                                        isPrivate={false}
                                        imgUrl="/images/avatar-1.png"
                                    />
                                ))
                            ) : (
                                <div className="flex flex-col gap-4">
                                    <span className="text-lg">
                                        Join rooms to show here!
                                    </span>
                                    <Link
                                        href={"/explore/rooms"}
                                        className="font-semibold text-lg bg-black text-white text-center rounded-full px-4 py-1 flex items-center justify-center hover:bg-white hover:text-black border-1 border-black transition-all"
                                    >
                                        Explore!
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
