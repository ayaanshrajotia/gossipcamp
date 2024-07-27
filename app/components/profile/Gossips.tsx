import { getSingleUserGossips } from "@/lib/slices/userSlice";
import { AppDispatch, RootState } from "@/lib/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { capitalizeFirstLetter } from "@/app/utils/helper";
import GossipContainer from "./GossipContainer";
import Skeleton from "react-loading-skeleton";
import { useTheme } from "next-themes";

function Gossips() {
    const dispatch = useDispatch<AppDispatch>();
    const { theme } = useTheme();
    const { gossips, gossipsLoading } = useSelector(
        (state: RootState) => state.users
    );
    const { userProfile } = useSelector(
        (state: RootState) => state.users
    );

    useEffect(() => {
        if (userProfile?.username !== undefined) {
            const getGossips = async () => {
                await dispatch(getSingleUserGossips(userProfile.username));
            };
            getGossips();
        }
    }, [userProfile]);

    return (
        <div className="flex flex-col gap-8">
            {gossipsLoading ? (
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
                <>
                    {gossips.map((gossip) => (
                        <GossipContainer
                            key={gossip?._id}
                            id={gossip?._id}
                            date={gossip.updatedAt}
                            profileUrl={userProfile?.avatar}
                            postImgUrl={gossip.image?.url}
                            user={
                                capitalizeFirstLetter(userProfile?.fName) +
                                capitalizeFirstLetter(userProfile?.lName)
                            }
                            description={gossip.text}
                            likesCount={gossip.likesCount || 0}
                            isUser={true}
                            messageType={"Text"}
                            discussionCount={gossip.discussionCount}
                        />
                    ))}
                </>
            )}
        </div>
    );
}

export default Gossips;
