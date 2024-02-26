"use client";

import RoomBoxBigger from "@/app/components/room-boxes/RoomBoxBigger";
import { capitalizeFirstLetter } from "@/app/utils/helper";
import { getAllRooms } from "@/lib/slices/roomSlice";
import { AppDispatch, RootState } from "@/lib/store";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function Page() {
    const { allRooms } = useSelector((state: RootState) => state.rooms);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getAllRooms());
    }, [dispatch]);

    console.log(allRooms);
    return (
        <div className="my-4 flex flex-col gap-7">
            {allRooms?.map((room: any) => (
                <RoomBoxBigger
                    key={room?._id}
                    roomName={room?.roomName}
                    roomId={
                        capitalizeFirstLetter(room?.adminProfile.fName) +
                        capitalizeFirstLetter(room?.adminProfile.lName)
                    }
                    roomDP={room?.roomDP}
                    roomDescription={room?.description}
                    bgcolor="bg-college-yellow"
                    textColor="black"
                    className="box-shadow-yellow"
                    isPrivate={false}
                    totalParticipants={room?.totalParticipants}
                />
            ))}
        </div>
    );
}

export default Page;
