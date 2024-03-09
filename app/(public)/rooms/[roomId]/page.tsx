"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
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
import { messageListener, openRoom } from "@/lib/slices/socketSlice";
import MessagesContainer from "../../../components/MessagesContainer";

export default function Room() {
    const router = useRouter();
    const { roomId } = useParams();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [pageLoading, setPageLoading] = useState(true);

    const { profile } = useSelector((state: RootState) => state.auth);
    const { publicRooms, privateRoom } = useSelector(
        (state: RootState) => state.rooms
    );
    const { getRoomDetailsLoading, roomDetails } = useSelector(
        (state: RootState) => state.rooms
    );
    const dispatch = useDispatch<AppDispatch>();

    useLayoutEffect(() => {
        setFirstName(profile.fName);
        setLastName(profile.lName);
        setImgUrl(profile.avatar);
    }, [profile]);

    useEffect(() => {
        // checking if the user is the participant of the room
        // const isPublicParticipant = publicRooms.find(
        //     (room: any) => room._id === roomId
        // );
        // const isPrivateParticipant = privateRoom?._id === roomId;
        // const isParticipant = isPublicParticipant || isPrivateParticipant;

        // if (!isParticipant) {
        //     return router.push("/explore/rooms");
        // }

        const getDetails = async () => {
            await dispatch(getRoomDetails(roomId.toString()));
            await dispatch(
                openRoom({
                    roomId: roomId.toString(),
                    userId: profile._id,
                })
            );
            await dispatch(messageListener());
        };

        getDetails();
        setPageLoading(false);
    }, [roomId, dispatch, publicRooms, privateRoom]);

    const handleRemoveRoom = async () => {
        await dispatch(toggleFollowRoom(roomId.toString()));
        await dispatch(getPublicJoinedRooms());
        await dispatch(getAllRooms());
        router.push("/explore/rooms");
    };

    return (
        <>
            <div className="pt-4 sticky w-full top-0 z-[999]">
                <div className="bg-stone-800 text-white flex items-center justify-between h-[70px] px-4 rounded-xl mx-6 py-2">
                    {pageLoading ||
                    getRoomDetailsLoading ||
                    profile === null ? (
                        <Skeleton count={2} width={600} baseColor="#464646" />
                    ) : (
                        <>
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
                                    <p className="font-secondary text-gray-400 text-sm w-full overflow-ellipsis line-clamp-1">
                                        {roomDetails?.description}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={handleRemoveRoom}
                                className="bg-white text-stone-800 font-secondary font-bold px-4 py-1 rounded-lg transition-all"
                            >
                                Leave
                            </button>
                        </>
                    )}
                </div>
            </div>
            <MessagesContainer roomId={roomId.toString()} />
        </>
    );
}
