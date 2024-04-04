"use client";

import RoomBoxBigger from "@/app/components/room-boxes/RoomBoxBigger";
import { capitalizeFirstLetter } from "@/app/utils/helper";
import { getAllCollegeRooms } from "@/lib/slices/roomSlice";
import { AppDispatch, RootState } from "@/lib/store";
import { useTheme } from "next-themes";
import React, { useEffect, useMemo, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";

function Page() {
    // const { collegeRooms, collegeRoomsLoading } = useSelector(
    //     (state: RootState) => state.rooms
    // );
    // const dispatch = useDispatch<AppDispatch>();
    // const [pageLoading, setPageLoading] = useState(true);
    // const { theme } = useTheme();

    // const fetchData = useMemo(() => {
    //     const getDetails = async () => {
    //         await dispatch(getAllCollegeRooms());
    //     };
    //     return getDetails;
    // }, [dispatch]);

    // useEffect(() => {
    //     if (collegeRooms.length === 0) fetchData();
    //     setPageLoading(false);
    // }, [dispatch]);
    return (
        <div className="my-4 flex flex-col gap-7">
            {/* {pageLoading || collegeRoomsLoading ? (
                <div className="flex flex-col gap-4">
                    <Skeleton
                        count={4}
                        height={25}
                        style={{ marginTop: "10px" }}
                        baseColor={theme === "dark" ? "#202020" : "#ebebeb"}
                        highlightColor={theme === "dark" ? "#444" : "#f2f2f2"}
                    />
                    <Skeleton
                        count={4}
                        height={25}
                        style={{ marginTop: "10px" }}
                        baseColor={theme === "dark" ? "#202020" : "#ebebeb"}
                        highlightColor={theme === "dark" ? "#444" : "#f2f2f2"}
                    />
                    <Skeleton
                        count={4}
                        height={25}
                        style={{ marginTop: "10px" }}
                        baseColor={theme === "dark" ? "#202020" : "#ebebeb"}
                        highlightColor={theme === "dark" ? "#444" : "#f2f2f2"}
                    />
                    <Skeleton
                        count={4}
                        height={25}
                        style={{ marginTop: "10px" }}
                        baseColor={theme === "dark" ? "#202020" : "#ebebeb"}
                        highlightColor={theme === "dark" ? "#444" : "#f2f2f2"}
                    />
                </div>
            ) : (
                collegeRooms?.map((room: any) => (
                    <RoomBoxBigger
                        key={room?._id}
                        roomId={room?._id}
                        roomName={room?.roomName}
                        roomType={room?.roomType}
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
                        className={
                            theme === "dark"
                                ? "box-shadow-static-dark"
                                : "box-shadow-static"
                        }
                        isPrivate={true}
                        totalParticipants={room?.totalParticipants}
                    />
                ))
            )} */}
        </div>
    );
}

export default Page;
