"use client";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { capitalizeFirstLetter } from "@/app/utils/helper";
import {
    getAllRooms,
    getPublicJoinedRooms,
    getRoomDetails,
    toggleFollowRoom,
} from "@/lib/slices/roomSlice";
import Skeleton from "react-loading-skeleton";
import {
    closeRoom,
    connectSocket,
    leaveRoomEmitter,
    openRoom,
} from "@/lib/slices/socketSlice";
import MessagesContainer from "../../../../components/MessagesContainer";
import Link from "next/link";
import { useTheme } from "next-themes";

export default function Room() {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const { roomId } = useParams();
    const { blur } = useSelector((state: RootState) => state.blur);
    const { profile } = useSelector((state: RootState) => state.auth);
    const { theme } = useTheme();

    const { getRoomDetailsLoading, roomDetails } = useSelector(
        (state: RootState) => state.rooms
    );

    const [pageLoading, setPageLoading] = useState(true);

    useEffect(() => {
        const getDetails = async () => {
            await dispatch(getRoomDetails(roomId.toString()));
            await dispatch(connectSocket());
            await dispatch(
                openRoom({
                    roomId: roomId.toString(),
                    profileId: profile?._id,
                })
            );
        };

        getDetails();
        setPageLoading(false);

        return () => {
            dispatch(closeRoom({ roomId: roomId.toString() }));
        };
    }, [roomId, dispatch]);

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

    // console.log(roomDetails);

    return (
        <div
            className={`min-h-sreen transition-all duration-200 ${
                blur ? "blur-md" : "blur-none"
            }`}
        >
            <div className="pt-4 sticky w-full top-0 z-[999]">
                <div className="bg-college-dark-gray-1 text-white flex items-center justify-between h-[70px] px-4 rounded-xl mx-6 py-2 dark:text-college-dark-gray-1 dark:bg-college-dark-white">
                    {pageLoading ||
                    getRoomDetailsLoading ||
                    profile === null ? (
                        <Skeleton
                            count={2}
                            width={200}
                            baseColor={
                                theme === "light" ? "#202020" : "#c5c3c3"
                            }
                            highlightColor={
                                theme === "light" ? "#444" : "#f2f2f2"
                            }
                        />
                    ) : (
                        <>
                            <Link
                                href={`/rooms/profile/${roomId}`}
                                className="flex"
                            >
                                <div className="flex gap-4">
                                    <div>
                                        <div className="relative h-[45px] w-[45px]">
                                            <Image
                                                src={roomDetails?.roomDP}
                                                alt="avatar-1"
                                                sizes="33vw"
                                                fill
                                                className="object-cover rounded-full"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-secondary font-extrabold text-lg">
                                            {roomDetails?.roomName}
                                        </span>
                                        <p className="font-secondary text-college-dark-white-2 text-sm w-full overflow-ellipsis line-clamp-1 max-[1330px]:w-[90%]">
                                            {roomDetails?.description}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </>
                    )}
                </div>
            </div>
            <MessagesContainer roomId={roomId.toString()} />
        </div>
    );
}
