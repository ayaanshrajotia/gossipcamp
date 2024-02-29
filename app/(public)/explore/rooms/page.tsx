"use client";

import RoomBoxBigger from "@/app/components/room-boxes/RoomBoxBigger";
import { capitalizeFirstLetter } from "@/app/utils/helper";
import { getAllRooms } from "@/lib/slices/roomSlice";
import { AppDispatch, RootState } from "@/lib/store";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { useEffect, useLayoutEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";

function Page() {
    const { allRooms, loading } = useSelector(
        (state: RootState) => state.rooms
    );
    const dispatch = useDispatch<AppDispatch>();
    const [pageLoading, setPageLoading] = useState(true);

    useEffect(() => {
        const getDetails = async () => {
            await dispatch(getAllRooms());
        };
        getDetails();
        setPageLoading(false);
    }, [dispatch]);
    return (
        <div className="my-4 flex flex-col gap-7">
            {pageLoading || loading ? (
                <div className="flex flex-col gap-4">
                    <Skeleton
                        count={4}
                        height={25}
                        style={{ marginTop: "10px" }}
                    />
                    <Skeleton
                        count={4}
                        height={25}
                        style={{ marginTop: "10px" }}
                    />
                    <Skeleton
                        count={4}
                        height={25}
                        style={{ marginTop: "10px" }}
                    />
                    <Skeleton
                        count={4}
                        height={25}
                        style={{ marginTop: "10px" }}
                    />
                </div>
            ) : (
                allRooms?.map((room: any) => (
                    <RoomBoxBigger
                        key={room?._id}
                        roomId={room?._id}
                        roomName={room?.roomName}
                        roomType="User"
                        roomUsername={
                            room?.roomUsername
                                ? room?.roomUsername
                                : capitalizeFirstLetter(
                                      room?.adminProfile.fName
                                  ) +
                                  capitalizeFirstLetter(
                                      room?.adminProfile.lName
                                  )
                        }
                        roomDP={room?.roomDP}
                        roomDescription={room?.description}
                        bgcolor="bg-college-yellow"
                        textColor="black"
                        className="box-shadow-yellow"
                        isPrivate={false}
                        totalParticipants={room?.totalParticipants}
                    />
                ))
            )}
        </div>
    );
}

export default Page;
