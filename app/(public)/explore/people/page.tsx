"use client";

import UserBox from "@/app/components/user-boxes/UserBox";
import { capitalizeFirstLetter } from "@/app/utils/helper";
import { getAllUsers } from "@/lib/slices/userSlice";
import { AppDispatch, RootState } from "@/lib/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function Page() {
    const { users } = useSelector((state: RootState) => state.users);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

    console.log(users);
    return (
        <div className="mt-4 grid grid-cols-4 gap-6">
            {users?.map((user: any) => (
                <UserBox
                    key={user._id}
                    userName={
                        capitalizeFirstLetter(user?.fName) +
                        capitalizeFirstLetter(user?.lName)
                    }
                    followers={Math.floor(Math.random() * 100) + 1}
                    userId={user?.username}
                    bgcolor="bg-college-yellow"
                    textColor="black"
                    className="box-shadow-yellow"
                    isPrivate={false}
                    avatar={user?.avatar}
                />
            ))}
        </div>
    );
}

export default Page;
