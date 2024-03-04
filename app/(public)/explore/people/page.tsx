"use client";

import UserBox from "@/app/components/user-boxes/UserBox";
import { capitalizeFirstLetter } from "@/app/utils/helper";
import { getAllUsers } from "@/lib/slices/userSlice";
import { AppDispatch, RootState } from "@/lib/store";
import React, { useEffect, useMemo, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";

function Page() {
    const { users, loading } = useSelector((state: RootState) => state.users);
    const [pageLoading, setPageLoading] = useState(true);
    const dispatch = useDispatch<AppDispatch>();

    const fetchData = useMemo(() => {
        const getDetails = async () => {
            await dispatch(getAllUsers());
        };
        return getDetails;
    }, [dispatch]);

    useEffect(() => {
        if (users.length === 0) fetchData();
        setPageLoading(false);
    }, [dispatch, users]);

    console.log(users);

    return (
        <>
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
                <div className="mt-4 grid grid-cols-4 gap-6">
                    {users?.map((user: any) => (
                        <UserBox
                            key={user._id}
                            userName={
                                capitalizeFirstLetter(user?.fName) +
                                capitalizeFirstLetter(user?.lName)
                            }
                            profileId={user?._id}
                            userId={user?.user}
                            bgcolor="bg-college-yellow"
                            textColor="black"
                            className="box-shadow-yellow"
                            isPrivate={false}
                            avatar={user?.avatar}
                            isFollowing={user?.isFollowing}
                            followers={user?.followers}
                        />
                    ))}
                </div>
            )}
        </>
    );
}

export default Page;
