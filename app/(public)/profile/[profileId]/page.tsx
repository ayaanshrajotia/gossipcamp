"use client";

import Header from "@/app/components/Header";
import { capitalizeFirstLetter } from "@/app/utils/helper";
import { getSingleUser, toggleFollowUser } from "@/lib/slices/userSlice";
import { AppDispatch, RootState } from "@/lib/store";
import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";

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
    const { profileId } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const { user, loading } = useSelector((state: RootState) => state.users);
    const [pageLoading, setPageLoading] = useState(true);
    const [isFollow, setIsFollow] = useState(false);

    const handleToggleFollow = async () => {
        try {
            setIsFollow((prev: any) => !prev);
            await dispatch(toggleFollowUser(user?.user));
        } catch (error) {
            console.log(error);
        }
    };

    useLayoutEffect(() => {
        setIsFollow(user?.isFollowing);
    }, [user]);

    useEffect(() => {
        const getDetails = async () => {
            await dispatch(getSingleUser(profileId.toString()));
        };
        getDetails();
        setPageLoading(false);
    }, [profileId, dispatch]);

    console.log(user);
    console.log(isFollow);

    return (
        <div className="min-h-screen relative w-full font-secondary">
            <Header>Profile</Header>
            <div className="my-6 px-6 flex flex-col gap-8">
                <div className="bg-white flex flex-col rounded-xl p-6 box-shadow-static gap-7">
                    {loading || pageLoading ? (
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
                                            src={user?.avatar}
                                            alt="profile-pic"
                                            className="absolute object-cover rounded-full"
                                            fill
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <h1 className="font-secondary font-extrabold text-2xl mb-1">
                                        {capitalizeFirstLetter(user?.fName)}
                                        {capitalizeFirstLetter(user?.lName)}
                                    </h1>
                                    <p className="text-justify line-clamp-2 text-sm leading-snug text-gray-500 mb-4">
                                        {user?.bio}
                                    </p>
                                    <div className="flex gap-2">
                                        <button
                                            className="bg-college-yellow py-1 px-8 font-bold rounded-full w-fit"
                                            onClick={handleToggleFollow}
                                        >
                                            {isFollow ? "Following" : "Follow"}
                                        </button>
                                        <button className="font-bold text-sm bg-gray-400 text-white rounded-full w-fit px-3 py-1">
                                            {user?.collegeName}
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
                                        {user?.followers}
                                    </span>
                                    <span>Followers</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className="font-bold text-2xl">
                                        {user?.following}
                                    </span>
                                    <span>Following</span>
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
