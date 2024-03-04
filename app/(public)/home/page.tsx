"use client";

import EmblaCarousel from "../../components/carousel/EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel";
import RoomBoxHome from "@/app/components/room-boxes/RoomBoxHome";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import {
    getRecentlyAddedRooms,
    getTrendingRooms,
} from "@/lib/slices/roomSlice";
import { useEffect, useMemo, useState } from "react";
import { capitalizeFirstLetter } from "@/app/utils/helper";
import Skeleton from "react-loading-skeleton";
import Header from "@/app/components/Header";

const Home = () => {
    const OPTIONS: EmblaOptionsType = { dragFree: true, loop: true };
    const SLIDE_COUNT = 5;
    const SLIDES = Array.from(Array(SLIDE_COUNT).keys());
    const [pageLoading, setPageLoading] = useState(true);
    const {
        trendingLoading,
        trendingRooms,
        recentlyAddedLoading,
        recentlyAddedRooms,
    } = useSelector((state: RootState) => state.rooms);
    const dispatch = useDispatch<AppDispatch>();

    const fetchData = useMemo(() => {
        const getDetails = async () => {
            await Promise.all([
                dispatch(getTrendingRooms()),
                dispatch(getRecentlyAddedRooms()),
            ]);
        };
        return getDetails;
    }, [dispatch]);

    useEffect(() => {
        if (trendingRooms.length === 0 || recentlyAddedRooms.length === 0)
            fetchData();
        setPageLoading(false);
    }, [dispatch, trendingRooms, recentlyAddedRooms]);

    return (
        <div className="min-h-screen relative w-full font-secondary boreder-r-1">
            <Header>Home</Header>
            <div className="my-6">
                <div className="px-6">
                    <EmblaCarousel slides={SLIDES} options={OPTIONS} />
                </div>
                <div className="flex flex-col gap-14 mt-8 px-6">
                    <div className="flex flex-col">
                        <h1 className="text-3xl font-extrabold font-secondary">
                            Trending Rooms
                        </h1>
                        <div className="mt-4 grid grid-cols-2 gap-6">
                            {pageLoading || trendingLoading ? (
                                <>
                                    <Skeleton count={4} />
                                    <Skeleton count={4} />
                                    <Skeleton count={4} />
                                    <Skeleton count={4} />
                                </>
                            ) : (
                                trendingRooms?.map((room: any) => (
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
                                        className="box-shadow-yellow-static"
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
                        <h1 className="text-3xl font-extrabold">
                            Recently Added Rooms
                        </h1>
                        <div className="mt-4 grid grid-cols-2 gap-6">
                            {pageLoading || recentlyAddedLoading ? (
                                <>
                                    <Skeleton count={4} />
                                    <Skeleton count={4} />
                                    <Skeleton count={4} />
                                    <Skeleton count={4} />
                                </>
                            ) : (
                                recentlyAddedRooms?.map((room: any) => (
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
                                        className="box-shadow-yellow"
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
