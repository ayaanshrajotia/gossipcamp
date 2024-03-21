"use client";;
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
import { closeRoom, leaveRoomEmitter, openRoom } from "@/lib/slices/socketSlice";
import MessagesContainer from "../../../../components/MessagesContainer";
import Link from "next/link";

export default function Room() {
    const router = useRouter();
    const { roomId } = useParams();
    const [pageLoading, setPageLoading] = useState(true);

    const { profile } = useSelector((state: RootState) => state.auth);
    const { publicRooms, privateRoom } = useSelector(
        (state: RootState) => state.rooms
    );
    const { getRoomDetailsLoading, roomDetails } = useSelector(
        (state: RootState) => state.rooms
    );

    const dispatch = useDispatch<AppDispatch>();

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
            // await dispatch(connectSocket());
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
    }, [roomId, dispatch, publicRooms, privateRoom]);

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

    return (
        <div className="min-h-sreen">
            <div className="pt-4 sticky w-full top-0 z-[999]">
                <div className="bg-stone-800 text-white flex items-center justify-between h-[70px] px-4 rounded-xl mx-6 py-2">
                    {pageLoading ||
                    getRoomDetailsLoading ||
                    profile === null ? (
                        <Skeleton count={2} width={600} baseColor="#464646" />
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
                                        <p className="font-secondary text-gray-400 text-sm w-full overflow-ellipsis line-clamp-1">
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
