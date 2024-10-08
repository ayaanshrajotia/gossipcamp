"use client";
import { useEffect, useState } from "react";
import RoomBox from "./room-boxes/RoomBox";
import Image from "next/image";

import { Bars3Icon } from "@heroicons/react/24/outline";
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
import { connectSocket, disconnectSocket } from "@/lib/slices/socketSlice";
import { useTheme } from "next-themes";
import { socket } from "../StoreProvider";

export default function Sidebar({ className = "" }: { className: string }) {
    const dispatch = useDispatch<AppDispatch>();
    const { theme } = useTheme();
    const { profile, loading, user } = useSelector(
        (state: RootState) => state.auth
    );
    const { privateRoom, publicRooms, privateLoading, publicLoading } =
        useSelector((state: RootState) => state.rooms);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [pageLoading, setPageLoading] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const { gossipDiscussion } = useSelector(
        (state: RootState) => state.gossipDiscussion
    );

    useEffect(() => {
        dispatch(connectSocket());

        socket.on("disconnect", () => {
            dispatch(connectSocket());
        });

        return () => {
            socket.off("disconnect");
            dispatch(disconnectSocket());
        };
    }, [dispatch]);

    useEffect(() => {
        const getDetails = async () => {
            await Promise.all([
                dispatch(getPrivateJoinedRooms()),
                dispatch(getPublicJoinedRooms()),
            ]);
        };
        getDetails();
        setFirstName(profile?.fName);
        setLastName(profile?.lName);
        setImgUrl(profile?.avatar);
        setPageLoading(false);
    }, [profile, dispatch]);

    return (
        <>
            <div
                className={`min-[1160px]:hidden flex w-[80px] justify-center pt-[1.9rem] fixed top-0 right-4 z-[1002] ${
                    gossipDiscussion ? "translate-x-[200px] " : "translate-x-0"
                }`}
            >
                <Bars3Icon
                    className={`min-[1160px]:hidden w-9 h-9 stroke-white dark:stroke-black cursor-pointer`}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                />
            </div>
            <div
                className={`bg-[#F6F6F9] dark:bg-college-dark-gray-1 max-[1160px]:bg-white max-[1160px]:dark:bg-college-dark-gray-1 max-[1160px]:z-[1003] fixed top-0 bottom-0 right-0 overflow-auto w-[340px] pl-4 transition-all duration-300 ${
                    !isMenuOpen
                        ? "max-[1160px]:translate-x-full"
                        : "max-[1160px]:translate-x-0"
                } ${className}`}
            >
                <div className=" pt-4 mb-4 mr-6">
                    <div className="h-[70px] w-full flex items-center">
                        <div className="flex-1 flex items-center justify-between gap-6">
                            {pageLoading || loading || profile === null ? (
                                <Link
                                    href={"/create-avatar"}
                                    className="bg-college-yellow rounded-full px-4 py-2 font-extrabold box-shadow-inverse dark:text-black text-sm"
                                >
                                    Create Your Profile
                                </Link>
                            ) : pageLoading || loading ? (
                                <Skeleton
                                    count={2}
                                    width={200}
                                    baseColor={
                                        theme === "dark" ? "#202020" : "#ebebeb"
                                    }
                                    highlightColor={
                                        theme === "dark" ? "#444" : "#f2f2f2"
                                    }
                                />
                            ) : (
                                <div className="flex justify-between cursor-pointer basis-[200px] overflow-ellipsis">
                                    <Link
                                        href={`/profile/${profile?.username.toString()}`}
                                        className="flex gap-2"
                                    >
                                        <div>
                                            <div className="relative h-[45px] w-[45px]">
                                                <Image
                                                    src={
                                                        imgUrl ||
                                                        "/images/avatar-1.png"
                                                    }
                                                    sizes="33vw"
                                                    alt="avatar-1"
                                                    fill
                                                    className="object-cover rounded-full"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-secondary font-extrabold text-base dark:text-college-dark-white text-ellipsis overflow-hidden max-[1160px]:w-[180px] w-[220px]">
                                                @
                                                {capitalizeFirstLetter(
                                                    firstName
                                                )}
                                                {capitalizeFirstLetter(
                                                    lastName
                                                )}
                                            </span>
                                            <span className="font-secondary text-sm text-college-dark-white-2">
                                                Profile
                                            </span>
                                        </div>
                                    </Link>
                                </div>
                            )}
                            <Bars3Icon
                                className={`min-[1160px]:hidden w-9 h-9 fill-white cursor-pointer`}
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col mt-2 gap-6 box-border">
                        <div
                            className={`flex flex-col gap-6 bg-white border-1 px-6 py-6 rounded-xl box-border ${
                                theme === "dark"
                                    ? "box-shadow-yellow-static-dark"
                                    : "box-shadow-yellow-static"
                            } dark:bg-college-dark-gray-2 dark:border-college-dark-gray-3`}
                        >
                            <h1 className="text-2xl font-extrabold font-secondary dark:text-college-dark-white">
                                Private Rooms
                            </h1>
                            <div>
                                {pageLoading || privateLoading ? (
                                    <Skeleton
                                        count={4}
                                        height={16}
                                        baseColor={
                                            theme === "dark"
                                                ? "#202020"
                                                : "#ebebeb"
                                        }
                                        highlightColor={
                                            theme === "dark"
                                                ? "#444"
                                                : "#f2f2f2"
                                        }
                                    />
                                ) : (
                                    <RoomBox
                                        roomName={privateRoom?.roomName}
                                        roomId={privateRoom?._id}
                                        roomDP={
                                            privateRoom?.roomDP ||
                                            "/images/avatar-1.png"
                                        }
                                        roomDescription={
                                            privateRoom?.description
                                        }
                                        roomType="College"
                                        roomUsername={privateRoom?.roomUsername}
                                        bgcolor="bg-college-yellow"
                                        className={
                                            theme === "dark"
                                                ? "box-shadow-static-dark"
                                                : "box-shadow-static"
                                        }
                                        textColor="black"
                                        isPrivate={true}
                                        totalParticipants={
                                            privateRoom?.totalParticipants
                                        }
                                        closeMenuFn={() => setIsMenuOpen(false)}
                                    />
                                )}
                            </div>
                        </div>

                        <div
                            className={`flex flex-col gap-6 bg-white border-1 border-college-dark-white rounded-xl py-6 ${
                                theme === "dark"
                                    ? "box-shadow-yellow-static-dark"
                                    : "box-shadow-yellow-static"
                            } px-6 dark:bg-college-dark-gray-2 dark:border-college-dark-gray-3`}
                        >
                            <h1 className="text-2xl font-extrabold font-secondary dark:text-college-dark-white ">
                                Public Rooms
                            </h1>
                            <div className="flex flex-col gap-6">
                                {pageLoading || publicLoading ? (
                                    <Skeleton
                                        count={4}
                                        height={16}
                                        baseColor={
                                            theme === "dark"
                                                ? "#202020"
                                                : "#ebebeb"
                                        }
                                        highlightColor={
                                            theme === "dark"
                                                ? "#444"
                                                : "#f2f2f2"
                                        }
                                    />
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
                                                          room?.adminProfile
                                                              ?.fName
                                                      ) +
                                                      capitalizeFirstLetter(
                                                          room?.adminProfile
                                                              ?.lName
                                                      )
                                            }
                                            roomDP={room?.roomDP}
                                            roomDescription={room?.description}
                                            bgcolor="bg-college-yellow"
                                            textColor="black"
                                            className={
                                                theme === "dark"
                                                    ? "box-shadow-static-dark"
                                                    : "box-shadow-static"
                                            }
                                            isPrivate={false}
                                            totalParticipants={
                                                room?.totalParticipants
                                            }
                                            closeMenuFn={() =>
                                                setIsMenuOpen(false)
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
                                            className="font-bold text-lg bg-black text-white text-center rounded-full px-4 py-1 flex items-center justify-center hover:bg-white hover:text-black border-1 border-black transition-all dark:bg-college-dark-white dark:text-college-dark-gray-1"
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
        </>
    );
}
