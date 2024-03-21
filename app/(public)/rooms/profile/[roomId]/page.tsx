"use client";

import Header from "@/app/components/Header";
import { capitalizeFirstLetter } from "@/app/utils/helper";
import { AppDispatch, RootState } from "@/lib/store";
import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import {
    getAllRooms,
    getPublicJoinedRooms,
    getRoomDetails,
    toggleFollowRoom,
} from "@/lib/slices/roomSlice";
import { leaveRoomEmitter } from "@/lib/slices/socketSlice";

const options = [
    {
        id: 1,
        title: "Posts",
        slug: "/profile/posts",
    },
    {
        id: 2,
        title: "Rooms",
        slug: "/profile/rooms",
    },
    {
        id: 3,
        title: "Followers",
        slug: "/profile/followers",
    },
    {
        id: 4,
        title: "Following",
        slug: "/profile/following",
    },
];

function Page() {
    const pathname = usePathname();
    const { roomId } = useParams();
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const { user } = useSelector((state: RootState) => state.auth);
    const { profile } = useSelector((state: RootState) => state.auth);
    const [pageLoading, setPageLoading] = useState(true);
    const { getRoomDetailsLoading, roomDetails } = useSelector(
        (state: RootState) => state.rooms
    );

    // const handleToggleFollow = async () => {
    //     try {
    //         setIsFollow((prev: any) => !prev);
    //         await dispatch(toggleFollowUser(userProfile?.user));
    //         await dispatch(getAllUsers());
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    const handleRemoveRoom = async () => {
        await dispatch(toggleFollowRoom(roomId.toString()));
        await dispatch(getPublicJoinedRooms());
        await dispatch(getAllRooms());

        const capitalizedName =
            capitalizeFirstLetter(profile.fName) +
            capitalizeFirstLetter(profile.lName);
        await dispatch(
            leaveRoomEmitter({
                roomId: roomId.toString(),
                profileId: profile?._id,
                username: capitalizedName,
            })
        );
        router.push("/explore/rooms");
    };

    useEffect(() => {
        console.log("room details fetching");
        const getDetails = async () => {
            await dispatch(getRoomDetails(roomId.toString()));
        };

        getDetails();
        setPageLoading(false);
    }, [roomId, dispatch]);

    console.log(roomDetails);

    return (
        <div className="min-h-screen relative w-full font-secondary">
            <Header>Profile</Header>
            <div className="my-6 px-6 flex flex-col gap-8">
                <div className="bg-white flex flex-col rounded-xl p-6 box-shadow-static gap-7">
                    {getRoomDetailsLoading || pageLoading ? (
                        <>
                            <Skeleton count={4} />
                            <Skeleton count={2} />
                        </>
                    ) : (
                        <>
                            <div className="flex basis-[60%] gap-5 h-full">
                                <div className="flex items-center">
                                    <div className="relative w-[110px] h-[110px]">
                                        <Image
                                            src={roomDetails?.roomDP}
                                            alt="profile-pic"
                                            className="absolute object-cover rounded-full"
                                            fill
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="flex flex-col mb-1">
                                        <h1 className="font-secondary font-extrabold text-2xl">
                                            {capitalizeFirstLetter(
                                                roomDetails?.roomName
                                            )}
                                        </h1>
                                        <span className="text-gray-500">
                                            @{roomDetails?.roomUsername}
                                        </span>
                                    </div>

                                    <p className="text-justify line-clamp-2 text-sm leading-snug  mb-4">
                                        {roomDetails?.description}
                                    </p>

                                    <div className="flex gap-2">
                                        {roomDetails?.roomType !==
                                            "College" && (
                                            <button
                                                className="bg-black text-white text-sm font-bold rounded-full hover:bg-white hover:text-black border-1 border-black transition-all py-1  px-3 flex items-center justify-center"
                                                onClick={handleRemoveRoom}
                                            >
                                                Leave Room
                                            </button>
                                        )}
                                        <button className="font-bold text-sm bg-gray-400 text-white rounded-full w-fit px-3 py-1">
                                            {roomDetails?.roomType}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="flex w-full gap-8 justify-evenly">
                                <div className="flex flex-col items-center">
                                    <span className="font-bold text-2xl">
                                        #1
                                    </span>
                                    <span>Popularity</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className="font-bold text-2xl">
                                        1252
                                    </span>
                                    <span>Messages</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className="font-bold text-2xl">
                                        18
                                    </span>
                                    <span>Members</span>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                <div className="px-4 ">
                    <ul className="flex justify-between">
                        {options.map((option) => (
                            <Link href={option.slug} key={option.id}>
                                <li
                                    className={`border-1 cursor-pointer rounded-2xl border-stone-800  p-1 px-4 font-semibold transition-all hover:bg-stone-800 hover:text-white ${
                                        pathname.includes(option.slug)
                                            ? "bg-stone-800 text-white"
                                            : "bg-white"
                                    }`}
                                >
                                    {option.title}
                                </li>
                            </Link>
                        ))}
                    </ul>
                </div>
                <div className="bg-white p-6 rounded-xl box-shadow-static"></div>
            </div>
        </div>
    );
}

export default Page;
