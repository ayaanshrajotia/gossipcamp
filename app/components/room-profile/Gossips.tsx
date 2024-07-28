import { getSingleUserGossips } from "@/lib/slices/userSlice";
import { AppDispatch, RootState } from "@/lib/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { capitalizeFirstLetter } from "@/app/utils/helper";
import Skeleton from "react-loading-skeleton";
import { useTheme } from "next-themes";
import { useParams } from "next/navigation";
import { getRoomGossips } from "@/lib/slices/roomSlice";
import GossipContainer from "../profile/GossipContainer";

function Gossips() {
    const dispatch = useDispatch<AppDispatch>();
    const { theme } = useTheme();
    const { roomId } = useParams();
    const { roomGossips, roomGossipsLoading } = useSelector(
        (state: RootState) => state.rooms
    );

    useEffect(() => {
        const getGossips = async () => {
            await dispatch(getRoomGossips(roomId.toString()));
        };
        getGossips();
    }, []);

    console.log(roomGossips);
    return (
        <div className="flex flex-col gap-8 z-[1]">
            {roomGossipsLoading ? (
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
                    {roomGossips.map((gossip: any) => (
                        <GossipContainer
                            key={gossip?._id}
                            id={gossip?._id}
                            date={gossip.updatedAt}
                            profileUrl={gossip?.profile?.avatar}
                            postImgUrl={gossip.image?.url}
                            user={
                                capitalizeFirstLetter(gossip?.profile?.fName) +
                                capitalizeFirstLetter(gossip?.profile?.lName)
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
