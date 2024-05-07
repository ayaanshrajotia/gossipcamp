"use client";
import EmblaCarousel from "../../../components/carousel/EmblaCarousel";
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
import { useTheme } from "next-themes";

const Home = () => {
    const OPTIONS: EmblaOptionsType = { dragFree: false, loop: true };
    const SLIDE_COUNT = 2;
    const SLIDES = Array.from(Array(SLIDE_COUNT).keys());
    const [pageLoading, setPageLoading] = useState(true);
    const {
        trendingLoading,
        trendingRooms,
        recentlyAddedLoading,
        recentlyAddedRooms,
    } = useSelector((state: RootState) => state.rooms);
    const dispatch = useDispatch<AppDispatch>();
    const { theme } = useTheme();

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
        if (!trendingRooms || !recentlyAddedRooms) fetchData();
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
                        <h1 className="text-3xl font-extrabold font-secondary dark:text-college-dark-white">
                            Trending Rooms
                        </h1>
                        <div className="max-[920px]:grid-cols-1 mt-4 grid grid-cols-2 gap-6">
                            {pageLoading || trendingLoading ? (
                                <>
                                    <Skeleton
                                        count={4}
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
                                    <Skeleton
                                        count={4}
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
                                    <Skeleton
                                        count={4}
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
                                    <Skeleton
                                        count={4}
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
                                        className={
                                            theme === "dark"
                                                ? "box-shadow-yellow-static-dark"
                                                : "box-shadow-yellow-static"
                                        }
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
                        <h1 className="text-3xl font-extrabold dark:text-college-dark-white">
                            Recently Added Rooms
                        </h1>
                        <div className="max-[920px]:grid-cols-1 mt-4 grid grid-cols-2 gap-6">
                            {pageLoading || recentlyAddedLoading ? (
                                <>
                                    <Skeleton
                                        count={4}
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
                                    <Skeleton
                                        count={4}
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
                                    <Skeleton
                                        count={4}
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
                                    <Skeleton
                                        count={4}
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
                                        className={
                                            theme === "dark"
                                                ? "box-shadow-yellow-static-dark"
                                                : "box-shadow-yellow-static"
                                        }
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
