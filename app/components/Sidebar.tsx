"use client";
import { useEffect, useState } from "react";
import RoomBox from "./room-boxes/RoomBox";
import Image from "next/image";

import { BellIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { capitalizeFirstLetter } from "../utils/helper";
import {
    getPrivateJoinedRooms,
    getPublicJoinedRooms,
} from "@/lib/slices/roomSlice";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Sidebar() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [pageLoading, setPageLoading] = useState(true);

    const { profile, loading } = useSelector((state: RootState) => state.auth);
    const { privateRoom, publicRooms, privateLoading, publicLoading } =
        useSelector((state: RootState) => state.rooms);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const getDetails = async () => {
            await dispatch(getPrivateJoinedRooms());
            await dispatch(getPublicJoinedRooms());
        };
        getDetails();
        setFirstName(profile?.fName);
        setLastName(profile?.lName);
        setImgUrl(profile?.avatar);
        setPageLoading(false);
    }, [profile, dispatch]);

    return (
        <div className="fixed top-0 bottom-0 right-0 overflow-auto w-[340px] pl-4">
            <div className=" pt-4 mb-4 mr-6">
                <div className="h-[70px] w-full flex items-center">
                    <div className="flex-1 flex items-center justify-between gap-6">
                        {pageLoading || loading || profile === null ? (
                            <Link
                                href={"/create-avatar"}
                                className="bg-college-yellow rounded-full px-4 py-2 font-extrabold box-shadow-inverse"
                            >
                                Create Your Profile
                            </Link>
                        ) : pageLoading || loading ? (
                            <Skeleton count={2} width={200} />
                        ) : (
                            <div className="flex justify-between cursor-pointer">
                                <Link href={"/profile"} className="flex gap-2">
                                    <div>
                                        <div className="relative h-[45px] w-[45px]">
                                            <Image
                                                src={
                                                    imgUrl ||
                                                    "/images/avatar-1.png"
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
                                </Link>
                            </div>
                        )}

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
                            {pageLoading || privateLoading ? (
                                <Skeleton count={4} height={16} />
                            ) : (
                                <RoomBox
                                    roomName={privateRoom?.roomName}
                                    roomId={privateRoom?._id}
                                    roomDP={
                                        privateRoom?.roomDP ||
                                        "/images/avatar-1.png"
                                    }
                                    roomDescription={privateRoom?.description}
                                    roomType="College"
                                    roomUsername={privateRoom?.roomUsername}
                                    bgcolor="bg-college-yellow"
                                    textColor="black"
                                    isPrivate={true}
                                    totalParticipants={
                                        privateRoom?.totalParticipants
                                    }
                                />
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col gap-6 bg-white border-1 rounded-xl py-6 box-shadow-yellow-static px-6">
                        <h1 className="text-2xl font-semibold font-secondary">
                            Public Rooms
                        </h1>
                        <div className="flex flex-col gap-6">
                            {pageLoading || publicLoading ? (
                                <Skeleton count={4} height={16} />
                            ) : publicRooms?.length > 0 ? (
                                publicRooms?.map((room: any) => (
                                    <RoomBox
                                        key={room?._id}
                                        roomId={room?._id}
                                        roomName={room?.roomName}
                                        roomType="User"
                                        roomUsername={
                                            room?.roomUsername
                                                ? room?.roomUsername
                                                : capitalizeFirstLetter(
                                                      room?.adminProfile?.fName
                                                  ) +
                                                  capitalizeFirstLetter(
                                                      room?.adminProfile?.lName
                                                  )
                                        }
                                        roomDP={room?.roomDP}
                                        roomDescription={room?.description}
                                        bgcolor="bg-college-yellow"
                                        textColor="black"
                                        isPrivate={false}
                                        totalParticipants={
                                            room?.totalParticipants
                                        }
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
