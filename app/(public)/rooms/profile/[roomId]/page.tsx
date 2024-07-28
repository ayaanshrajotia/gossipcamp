"use client";

import Header from "@/app/components/Header";
import { capitalizeFirstLetter } from "@/app/utils/helper";
import { AppDispatch, RootState } from "@/lib/store";
import Image from "next/image";
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
import Members from "@/app/components/room-profile/Members";
import Gossips from "@/app/components/room-profile/Gossips";

const options = [
    {
        id: 1,
        title: "Gossips",
        slug: "gossips",
    },
    {
        id: 2,
        title: "Members",
        slug: "members",
    },
];

function Page() {
    const { roomId } = useParams();
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const { user } = useSelector((state: RootState) => state.auth);
    const { profile } = useSelector((state: RootState) => state.auth);
    const [activeTab, setActiveTab] = useState("gossips");
    const [pageLoading, setPageLoading] = useState(true);
    const { getRoomProfileDetailsLoading, roomProfileDetails } = useSelector(
        (state: RootState) => state.rooms
    );
    const { theme } = useTheme();

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

    const renderTab = () => {
        switch (activeTab) {
            case "members":
                return <Members />;
            case "gossips":
                return <Gossips />;

            default:
                <Members />;
        }
    };

    return (
        <div className="min-h-screen relative w-full font-secondary">
            <Header>Profile</Header>
            <div className="my-6 px-6 flex flex-col gap-8 ">
                <div
                    className={`relative bg-white flex flex-col rounded-xl p-6 ${
                        theme === "dark"
                            ? "box-shadow-static-dark"
                            : "box-shadow-static"
                    } gap-7 dark:bg-college-dark-gray-2`}
                >
                    <div
                        className={`bg-[url('https://camo.githubusercontent.com/cba518ead87b032dc6f1cbfc7fade27604449201ac1baf34d889f77f093f01ac/68747470733a2f2f7765622e77686174736170702e636f6d2f696d672f62672d636861742d74696c652d6461726b5f61346265353132653731393562366237333364393131306234303866303735642e706e67')] bg-scroll bg-repeat bg-auto h-full w-full absolute top-0 left-0 invert-[10%] dark:invert-[80%] transition-all duration-300`}
                    ></div>
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
                        <div className="z-[1] flex flex-col gap-6">
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
                                                className="bg-black text-white text-sm font-bold rounded-full hover:bg-white hover:text-black border-1 border-black transition-all py-1  px-3 flex items-center justify-center dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white dark:hover:border-white"
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
                                    <span className="font-bold text-3xl">
                                        #1
                                    </span>
                                    <span>Popularity</span>
                                </div>
                                <div className="flex flex-col items-center dark:text-college-dark-white">
                                    <span className="font-bold text-3xl">
                                        {roomProfileDetails?.totalMessages}
                                    </span>
                                    <span>Messages</span>
                                </div>
                                <div className="flex flex-col items-center dark:text-college-dark-white">
                                    <span className="font-bold text-3xl">
                                        {roomProfileDetails?.totalParticipants}
                                    </span>
                                    <span>Members</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="px-4 z-[1]">
                    <ul className="flex justify-between">
                        {options.map((option) => (
                            <li
                                key={option.id}
                                onClick={() => setActiveTab(option.slug)}
                                className={`border-1 cursor-pointer rounded-2xl border-college-dark-gray-1  p-1 px-4 font-semibold transition-all hover:bg-college-dark-gray-1 hover:text-white dark:hover:bg-college-dark-white dark:hover:text-college-dark-gray-1 ${
                                    activeTab === option.slug
                                        ? "bg-college-dark-gray-1 text-white dark:text-college-dark-gray-1 dark:bg-college-dark-white"
                                        : "bg-white dark:bg-college-dark-gray-3 dark:text-college-dark-white"
                                }`}
                            >
                                {option.title}
                            </li>
                        ))}
                    </ul>
                </div>
                <div
                    className={`relative bg-white p-6 rounded-xl ${
                        theme === "dark"
                            ? "box-shadow-static-dark"
                            : "box-shadow-static"
                    } dark:bg-college-dark-gray-2`}
                >
                    <div
                        className={`bg-[url('https://camo.githubusercontent.com/cba518ead87b032dc6f1cbfc7fade27604449201ac1baf34d889f77f093f01ac/68747470733a2f2f7765622e77686174736170702e636f6d2f696d672f62672d636861742d74696c652d6461726b5f61346265353132653731393562366237333364393131306234303866303735642e706e67')] bg-scroll bg-repeat bg-auto h-full w-full absolute top-0 left-0 invert-[10%] dark:invert-[80%]`}
                    ></div>

                    {renderTab()}
                </div>
            </div>
        </div>
    );
}

export default Page;
