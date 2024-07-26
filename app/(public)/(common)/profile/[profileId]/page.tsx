"use client";

import Header from "@/app/components/Header";
import { capitalizeFirstLetter } from "@/app/utils/helper";
import {
    getAllUsers,
    getSingleUser,
    toggleFollowUser,
} from "@/lib/slices/userSlice";
import { AppDispatch, RootState } from "@/lib/store";
import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import { useTheme } from "next-themes";

const options = [
    {
        id: 1,
        title: "Gossips",
        slug: `gossips`,
    },
    {
        id: 2,
        title: "Rooms",
        slug: `rooms`,
    },
    {
        id: 3,
        title: "Followers",
        slug: `followers`,
    },
    {
        id: 4,
        title: "Following",
        slug: `following`,
    },
];

function Page() {
    const { profileId } = useParams();
    const pathname = usePathname();
    const dispatch = useDispatch<AppDispatch>();
    const { userProfile, userLoading } = useSelector(
        (state: RootState) => state.users
    );
    const { user } = useSelector((state: RootState) => state.auth);
    const [pageLoading, setPageLoading] = useState(true);
    const [isFollow, setIsFollow] = useState(false);
    const { theme } = useTheme();
    const [activeTab, setActiveTab] = useState("gossips");

    const handleToggleFollow = async () => {
        try {
            setIsFollow((prev: any) => !prev);
            await dispatch(toggleFollowUser(userProfile?.user));
            await dispatch(getAllUsers());
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const getDetails = async () => {
            await dispatch(getSingleUser(profileId.toString()));
        };
        getDetails();
        setIsFollow(userProfile?.isFollowing);
        setPageLoading(false);
    }, [profileId, dispatch, userProfile?.isFollowing]);

    const renderContent = () => {
        switch (activeTab) {
            case "gossips":
                return (
                    <div
                        className={`bg-white p-6 rounded-xl ${
                            theme === "dark"
                                ? "box-shadow-static-dark"
                                : "box-shadow-static"
                        } dark:bg-college-dark-gray-2`}
                    >
                        Gossip
                    </div>
                );
            case "rooms":
                return (
                    <div
                        className={`bg-white p-6 rounded-xl ${
                            theme === "dark"
                                ? "box-shadow-static-dark"
                                : "box-shadow-static"
                        } dark:bg-college-dark-gray-2`}
                    >
                        rooms
                    </div>
                );
            case "followers":
                return (
                    <div
                        className={`bg-white p-6 rounded-xl ${
                            theme === "dark"
                                ? "box-shadow-static-dark"
                                : "box-shadow-static"
                        } dark:bg-college-dark-gray-2`}
                    >
                        followers
                    </div>
                );
            case "following":
                return (
                    <div
                        className={`bg-white p-6 rounded-xl ${
                            theme === "dark"
                                ? "box-shadow-static-dark"
                                : "box-shadow-static"
                        } dark:bg-college-dark-gray-2`}
                    >
                        following
                    </div>
                );
            default:
                return (
                    <div
                        className={`bg-white p-6 rounded-xl ${
                            theme === "dark"
                                ? "box-shadow-static-dark"
                                : "box-shadow-static"
                        } dark:bg-college-dark-gray-2`}
                    >
                        asd
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen relative w-full font-secondary">
            <Header>Profile</Header>
            <div className="my-6 px-6 flex flex-col gap-8">
                <div
                    className={`bg-white flex flex-col rounded-xl p-6 box-shadow-static gap-7 ${
                        theme === "dark"
                            ? "box-shadow-static-dark"
                            : "box-shadow-static"
                    } dark:bg-college-dark-gray-2 dark:text-college-dark-white`}
                >
                    {userLoading || pageLoading ? (
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
                        // Profile
                        <>
                            <div className="max-[700px]:flex-col flex">
                                <div className="flex flex-1 gap-5 h-full">
                                    <div className="flex items-center">
                                        <div className="relative w-[110px] h-[110px]">
                                            <Image
                                                src={userProfile?.avatar}
                                                alt="profile-pic"
                                                className="absolute object-cover rounded-full"
                                                fill
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <h1 className="font-secondary font-extrabold text-2xl mb-1 dark:text-college-dark-white">
                                            {capitalizeFirstLetter(
                                                userProfile?.fName
                                            )}
                                            {capitalizeFirstLetter(
                                                userProfile?.lName
                                            )}
                                        </h1>

                                        <p className="text-justify line-clamp-2 text-sm leading-snug text-college-dark-white-2 mb-4 ">
                                            {userProfile?.bio ||
                                                "No bio available"}
                                        </p>

                                        <div className="flex gap-2">
                                            {userProfile?.user !==
                                                user?._id && (
                                                <button
                                                    className="bg-college-yellow py-1 px-8 font-bold rounded-full w-fit dark:text-college-dark-gray-1"
                                                    onClick={handleToggleFollow}
                                                >
                                                    {isFollow
                                                        ? "Following"
                                                        : "Follow"}
                                                </button>
                                            )}
                                            <button className="font-bold text-sm bg-college-dark-white-2 text-white rounded-full w-fit px-3 py-1">
                                                {userProfile?.collegeName}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="max-[700px]:justify-center flex items-center">
                                    <h1 className="font-primary font-black text-3xl p-6">
                                        {userProfile?.position}
                                    </h1>
                                </div>
                            </div>
                            <div className="max-[700px]:grid max-[700px]:grid-cols-2 flex w-full gap-8 justify-evenly">
                                <div className="flex flex-col items-center">
                                    <span className="font-bold text-2xl">
                                        #1
                                    </span>
                                    <span>Popularity</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className="font-bold text-2xl">
                                        {userProfile?.interactiveScore}
                                    </span>
                                    <span>Messages</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className="font-bold text-2xl">
                                        {userProfile?.followers}
                                    </span>
                                    <span>Followers</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className="font-bold text-2xl">
                                        {userProfile?.following}
                                    </span>
                                    <span>Following</span>
                                </div>
                            </div>
                        </>
                    )}
                </div>
                {/* Navbar */}
                <div className="px-4 ">
                    <ul className="flex justify-between">
                        {options.map((option) => (
                            <li
                                key={option.id}
                                onClick={() => setActiveTab(option.slug)}
                                className={`border-1 cursor-pointer rounded-2xl border-college-dark-gray-1  p-1 px-4 font-semibold transition-all hover:bg-college-dark-gray-1 hover:text-white dark:hover:bg-college-dark-white dark:hover:text-college-dark-gray-1 ${
                                    option.slug === activeTab
                                        ? "bg-college-dark-gray-1 text-white dark:text-college-dark-gray-1 dark:bg-college-dark-white"
                                        : "bg-white dark:bg-college-dark-gray-3 dark:text-college-dark-white"
                                }`}
                            >
                                {option.title}
                            </li>
                        ))}
                    </ul>
                </div>
                {renderContent()}
            </div>
        </div>
    );
}

export default Page;
