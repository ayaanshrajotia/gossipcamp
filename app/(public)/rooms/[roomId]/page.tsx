"use client";

import { RoomPropsType } from "@/app/utils/definitions";
import PostBox from "@/app/components/post-containers/PostBox";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { capitalizeFirstLetter } from "@/app/utils/helper";
import {
    addPublicJoinedRoom,
    getAllRooms,
    getPublicJoinedRooms,
    getRoomDetails,
    removePublicJoinedRoom,
    toggleFollowRoom,
} from "@/lib/slices/roomSlice";
import { set } from "react-hook-form";
import Skeleton from "react-loading-skeleton";

export default function Room() {
    const router = useRouter();
    const { roomId } = useParams();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [pageLoading, setPageLoading] = useState(true);

    const { profile } = useSelector((state: RootState) => state.auth);
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
        const getDetails = async () => {
            await dispatch(getRoomDetails(roomId.toString()));
        };
        getDetails();
        setPageLoading(false);
    }, [roomId, dispatch]);

    const handleRemoveRoom = async () => {
        // dispatch(removePublicJoinedRoom(roomId));
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
            <div className="w-full my-6 mb-10 max-w-[1400px] mx-auto flex flex-col gap-8 z-[-1] px-6">
                <PostBox
                    className="box-shadow-black"
                    date="8 Jan"
                    profileUrl="/images/avatar-2.png"
                    user="Nightranger"
                    description="What do you guys think about this course on Web development by CollegeKhabar? Please vote in the poll."
                    postImgUrl="/thumbnail.jpg"
                    isUser={false}
                />
                <PostBox
                    className="box-shadow-black"
                    date="8 Jan"
                    profileUrl="/images/avatar-2.png"
                    user="Nightranger"
                    description="What do you guys think about this course on Web development by CollegeKhabar? Please vote in the poll."
                    postImgUrl="/thumbnail.jpg"
                    isUser={false}
                />
                <PostBox
                    className="box-shadow-black"
                    date="8 Jan"
                    profileUrl={imgUrl || "/images/avatar-1.png"}
                    user={
                        capitalizeFirstLetter(firstName) +
                        capitalizeFirstLetter(lastName)
                    }
                    description="I know a guy who can help in hacking the instagram accounts"
                    isUser={true}
                />
                <PostBox
                    className="box-shadow-black"
                    date="8 Jan"
                    profileUrl="/images/avatar-1.png"
                    user="BurgerEater"
                    description="This app is so coooooool 🔥. Best social media app for College students."
                    isUser={false}
                />
                <PostBox
                    date="8 Jan"
                    profileUrl={imgUrl || "/images/avatar-1.png"}
                    user={
                        capitalizeFirstLetter(firstName) +
                        capitalizeFirstLetter(lastName)
                    }
                    description="This app is so coooooool 🔥. Best social media app for College students."
                    isUser={true}
                />
                <PostBox
                    date="8 Jan"
                    profileUrl={imgUrl || "/images/avatar-1.png"}
                    user={
                        capitalizeFirstLetter(firstName) +
                        capitalizeFirstLetter(lastName)
                    }
                    description="I know a guy who can help in hacking the instagram accounts"
                    isUser={true}
                />
                <PostBox
                    date="8 Jan"
                    profileUrl="/images/avatar-1.png"
                    user="BurgerEater"
                    description="This app is so coooooool 🔥. Best social media app for College students."
                    isUser={false}
                />
                <PostBox
                    date="8 Jan"
                    profileUrl={imgUrl || "/images/avatar-1.png"}
                    user={
                        capitalizeFirstLetter(firstName) +
                        capitalizeFirstLetter(lastName)
                    }
                    description="This app is so coooooool 🔥. Best social media app for College students."
                    isUser={true}
                />
            </div>
        </>
    );
}
