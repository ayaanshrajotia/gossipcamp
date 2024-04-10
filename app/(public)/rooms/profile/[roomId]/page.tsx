"use client";

import Header from "@/app/components/Header";
import { capitalizeFirstLetter } from "@/app/utils/helper";
import { AppDispatch, RootState } from "@/lib/store";
import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import {
    getAllRooms,
    getPublicJoinedRooms,
    getRecentlyAddedRooms,
    getRoomProfileDetails,
    getTrendingRooms,
    toggleFollowRoom,
} from "@/lib/slices/roomSlice";
import { leaveRoomEmitter } from "@/lib/slices/socketSlice";
import { useTheme } from "next-themes";

const options = [
    { id: 1, title: "Gossips", slug: "/profile/gossips" },
    {
        id: 2,
        title: "Posts",
        slug: "/profile/posts",
    },
    {
        id: 3,
        title: "Members",
        slug: "/profile/followers",
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
    const { getRoomProfileDetailsLoading, roomProfileDetails } = useSelector(
        (state: RootState) => state.rooms
    );
    const { theme } = useTheme();

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
        await dispatch(getTrendingRooms());
        await dispatch(getRecentlyAddedRooms());

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
        const getDetails = async () => {
            await dispatch(getRoomProfileDetails(roomId.toString()));
        };

        getDetails();
        setPageLoading(false);
    }, [roomId, dispatch]);

    return (
        <div className="min-h-screen relative w-full font-secondary">
            <Header>Profile</Header>
            <div className="my-6 px-6 flex flex-col gap-8 ">
                <div
                    className={`bg-white flex flex-col rounded-xl p-6 ${
                        theme === "dark"
                            ? "box-shadow-static-dark"
                            : "box-shadow-static"
                    } gap-7 dark:bg-college-dark-gray-2`}
                >
                    {getRoomProfileDetailsLoading || pageLoading ? (
                        <>
                            <Skeleton
                                count={2}
                                style={{ marginTop: "10px" }}
                                baseColor={
                                    theme === "dark" ? "#202020" : "#ebebeb"
                                }
                                highlightColor={
                                    theme === "dark" ? "#444" : "#f2f2f2"
                                }
                            />
                            <Skeleton
                                count={4}
                                style={{ marginTop: "10px" }}
                                baseColor={
                                    theme === "dark" ? "#202020" : "#ebebeb"
                                }
                                highlightColor={
                                    theme === "dark" ? "#444" : "#f2f2f2"
                                }
                            />
                        </>
                    ) : (
                        <>
                            <div className="flex basis-[60%] gap-5 h-full">
                                <div className="flex items-center">
                                    <div className="relative w-[110px] h-[110px]">
                                        <Image
                                            src={roomProfileDetails?.roomDP}
                                            alt="profile-pic"
                                            className="absolute object-cover rounded-full"
                                            fill
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="flex flex-col mb-1">
                                        <h1 className="font-secondary font-extrabold text-2xl dark:text-college-dark-white">
                                            {capitalizeFirstLetter(
                                                roomProfileDetails?.roomName
                                            )}
                                        </h1>
                                        <span className="text-gray-500">
                                            @{roomProfileDetails?.roomUsername}
                                        </span>
                                    </div>

                                    <p className="text-justify line-clamp-2 text-sm leading-snug  mb-4 dark:text-college-dark-white">
                                        {roomProfileDetails?.description}
                                    </p>

                                    <div className="flex gap-2">
                                        {roomProfileDetails?.roomType !==
                                            "College" && (
                                            <button
                                                className="bg-black text-white text-sm font-bold rounded-full hover:bg-white hover:text-black border-1 border-black transition-all py-1  px-3 flex items-center justify-center"
                                                onClick={handleRemoveRoom}
                                            >
                                                Leave Room
                                            </button>
                                        )}
                                        <button className="font-bold text-sm bg-college-dark-white-2 text-white rounded-full w-fit px-3 py-1">
                                            {roomProfileDetails?.roomType}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="flex w-full gap-8 justify-evenly">
                                <div className="flex flex-col items-center dark:text-college-dark-white">
                                    <span className="font-bold text-2xl">
                                        #1
                                    </span>
                                    <span>Popularity</span>
                                </div>
                                <div className="flex flex-col items-center dark:text-college-dark-white">
                                    <span className="font-bold text-2xl">
                                        {roomProfileDetails?.totalMessages}
                                    </span>
                                    <span>Messages</span>
                                </div>
                                <div className="flex flex-col items-center dark:text-college-dark-white">
                                    <span className="font-bold text-2xl">
                                        {roomProfileDetails?.totalParticipants}
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
                                    className={`border-1 cursor-pointer rounded-2xl border-college-dark-gray-1  p-1 px-4 font-semibold transition-all hover:bg-college-dark-gray-1 hover:text-white dark:hover:bg-college-dark-white dark:hover:text-college-dark-gray-1 ${
                                        pathname.includes(option.slug)
                                            ? "bg-college-dark-gray-1 text-white dark:text-college-dark-gray-1 dark:bg-college-dark-white"
                                            : "bg-white dark:bg-college-dark-gray-3 dark:text-college-dark-white"
                                    }`}
                                >
                                    {option.title}
                                </li>
                            </Link>
                        ))}
                    </ul>
                </div>
                <div
                    className={`bg-white p-6 rounded-xl ${
                        theme === "dark"
                            ? "box-shadow-static-dark"
                            : "box-shadow-static"
                    } dark:bg-college-dark-gray-2`}
                ></div>
            </div>
        </div>
    );
}

export default Page;
