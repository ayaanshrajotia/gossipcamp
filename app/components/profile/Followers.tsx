import { getSingleUserFollowers } from "@/lib/slices/userSlice";
import { AppDispatch, RootState } from "@/lib/store";
import { useTheme } from "next-themes";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserBox from "../user-boxes/UserBox";
import { capitalizeFirstLetter } from "@/app/utils/helper";

function Followers({ username }: { username: string }) {
    const { theme } = useTheme();
    const dispatch = useDispatch<AppDispatch>();
    const { followers, followersLoading } = useSelector(
        (state: RootState) => state.users
    );

    console.log(followers);

    useEffect(() => {
        dispatch(getSingleUserFollowers(username.toString()));
    }, []);
    return (
        <div className="max-[500px]:grid-cols-1 max-[600px]:grid-cols-2 max-[800px]:grid-cols-3 mt-4 grid grid-cols-4 gap-8">
            {followers?.map((user) => (
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
                    className={
                        theme === "dark"
                            ? "box-shadow-static-dark"
                            : "box-shadow-static"
                    }
                    isPrivate={false}
                    avatar={user?.avatar}
                    isFollowing={user?.isFollowing}
                    followers={user?.followers}
                />
            ))}
        </div>
    );
}

export default Followers;
