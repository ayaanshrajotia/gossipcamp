import { getSingleUserFollowers } from "@/lib/slices/userSlice";
import { AppDispatch, RootState } from "@/lib/store";
import { useTheme } from "next-themes";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserBox from "../user-boxes/UserBox";
import { capitalizeFirstLetter } from "@/app/utils/helper";
import { useParams } from "next/navigation";
import { getRoomMembers } from "@/lib/slices/roomSlice";
import Skeleton from "react-loading-skeleton";

function Members() {
    const { theme } = useTheme();
    const { roomId } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const { roomMembers, roomMembersLoading } = useSelector(
        (state: RootState) => state.rooms
    );

    useEffect(() => {
        dispatch(getRoomMembers(roomId.toString()));
    }, []);

    console.log(roomMembers);

    return (
        <div className="">
            {roomMembersLoading ? (
                <div className="flex flex-col-reverse gap-4 h-full">
                    <Skeleton
                        count={2}
                        baseColor={theme === "dark" ? "#202020" : "#e0dfdf"}
                        highlightColor={theme === "dark" ? "#444" : "#f2f2f2"}
                    />
                    <Skeleton
                        count={2}
                        baseColor={theme === "dark" ? "#202020" : "#e0dfdf"}
                        highlightColor={theme === "dark" ? "#444" : "#f2f2f2"}
                    />
                    <Skeleton
                        count={2}
                        baseColor={theme === "dark" ? "#202020" : "#e0dfdf"}
                        highlightColor={theme === "dark" ? "#444" : "#f2f2f2"}
                    />
                    <Skeleton
                        count={2}
                        baseColor={theme === "dark" ? "#202020" : "#e0dfdf"}
                        highlightColor={theme === "dark" ? "#444" : "#f2f2f2"}
                    />
                </div>
            ) : (
                <div className="max-[500px]:grid-cols-1 max-[600px]:grid-cols-2 max-[800px]:grid-cols-3 mt-4 grid grid-cols-4 gap-8">
                    {roomMembers?.map((user: any) => (
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
            )}
        </div>
    );
}

export default Members;
