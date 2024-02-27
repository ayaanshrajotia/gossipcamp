"use client";

import HomeCard from "@/app/components/cards/HomeCard";
import EmblaCarousel from "../../components/carousel/EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel";
import RoomBox from "@/app/components/room-boxes/RoomBox";
import RoomBoxBigger from "@/app/components/room-boxes/RoomBoxBigger";
import RoomBoxHome from "@/app/components/room-boxes/RoomBoxHome";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { getAllRooms } from "@/lib/slices/roomSlice";
import { useEffect, useState } from "react";
import { capitalizeFirstLetter } from "@/app/utils/helper";
import Skeleton from "react-loading-skeleton";

const Home = () => {
    const OPTIONS: EmblaOptionsType = { dragFree: true, loop: true };
    const SLIDE_COUNT = 5;
    const SLIDES = Array.from(Array(SLIDE_COUNT).keys());
    const [pageLoading, setPageLoading] = useState(true);
    const { allRooms, loading } = useSelector(
        (state: RootState) => state.rooms
    );
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const getDetails = async () => {
            await dispatch(getAllRooms());
        };
        getDetails();
        setPageLoading(false);
    }, [dispatch]);

    return (
        <div className="min-h-screen relative w-full font-secondary boreder-r-1">
            <div className="pt-4 sticky w-full top-0 z-[999]">
                <div className="bg-stone-800 text-white flex items-center gap-4 h-[65px] px-4 rounded-xl mx-6 ">
                    <h1 className="font-secondary font-bold text-2xl">Home</h1>
                </div>
            </div>
            <div className="my-6">
                <div className=" px-6">
                    <EmblaCarousel slides={SLIDES} options={OPTIONS} />
                </div>
                <div className="flex flex-col gap-14 mt-4 px-6">
                    <div className="flex flex-col">
                        <h1 className="text-2xl font-bold font-secondary">
                            Trending Rooms
                        </h1>
                        <div className="mt-4 grid grid-cols-2 gap-6">
                            {pageLoading || loading ? (
                                <>
                                    <Skeleton count={4} />
                                    <Skeleton count={4} />
                                    <Skeleton count={4} />
                                    <Skeleton count={4} />
                                </>
                            ) : (
                                allRooms?.map((room: any) => (
                                    <RoomBoxHome
                                        key={room?._id}
                                        roomId={room?._id}
                                        roomName={room?.roomName}
                                        roomType="User"
                                        roomUsername={
                                            room?.roomUsername
                                                ? room?.roomUsername
                                                : capitalizeFirstLetter(
                                                      room?.adminProfile?.fName
                                                  ) +
                                                  capitalizeFirstLetter(
                                                      room?.adminProfile?.lName
                                                  )
                                        }
                                        roomDP={room?.roomDP}
                                        roomDescription={room?.description}
                                        bgcolor="bg-college-yellow"
                                        textColor="black"
                                        isPrivate={false}
                                        totalParticipants={
                                            room?.totalParticipants
                                        }
                                    />
                                ))
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-2xl font-bold">
                            Recently Added Rooms
                        </h1>
                        <div className="mt-4 grid grid-cols-2 gap-6">
                            {pageLoading || loading ? (
                                <>
                                    <Skeleton count={4} />
                                    <Skeleton count={4} />
                                    <Skeleton count={4} />
                                    <Skeleton count={4} />
                                </>
                            ) : (
                                allRooms?.map((room: any) => (
                                    <RoomBoxHome
                                        key={room?._id}
                                        roomId={room?._id}
                                        roomName={room?.roomName}
                                        roomType="User"
                                        roomUsername={
                                            room?.roomUsername
                                                ? room?.roomUsername
                                                : capitalizeFirstLetter(
                                                      room?.adminProfile?.fName
                                                  ) +
                                                  capitalizeFirstLetter(
                                                      room?.adminProfile?.lName
                                                  )
                                        }
                                        roomDP={room?.roomDP}
                                        roomDescription={room?.description}
                                        bgcolor="bg-college-yellow"
                                        textColor="black"
                                        isPrivate={false}
                                        totalParticipants={
                                            room?.totalParticipants
                                        }
                                    />
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
