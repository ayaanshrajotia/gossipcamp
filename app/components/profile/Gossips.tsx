import { getSingleUserGossips } from "@/lib/slices/userSlice";
import { AppDispatch, RootState } from "@/lib/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { capitalizeFirstLetter } from "@/app/utils/helper";
import GossipContainer from "./GossipContainer";

function Gossips() {
    const dispatch = useDispatch<AppDispatch>();
    const { gossips, gossipsLoading } = useSelector(
        (state: RootState) => state.users
    );
    const { userProfile, userLoading } = useSelector(
        (state: RootState) => state.users
    );

    useEffect(() => {
        const getGossips = async () => {
            await dispatch(getSingleUserGossips(userProfile?.username));
        };
        getGossips();
    }, [userProfile]);

    return (
        <div className="flex flex-col gap-8">
            {gossips.map((gossip) => (
                <GossipContainer
                    key={gossip?._id}
                    id={gossip?._id}
                    isLiked={gossip?.isLiked}
                    isGossipVoted={gossip?.isGossipVoted}
                    gossipType={gossip.gossipType}
                    date={gossip.updatedAt}
                    profileUrl={userProfile?.avatar}
                    postImgUrl={gossip.image?.url}
                    pollOptions={gossip?.pollOptions}
                    isPollVoted={gossip?.isPollVoted}
                    user={
                        capitalizeFirstLetter(userProfile?.fName) +
                        capitalizeFirstLetter(userProfile?.lName)
                    }
                    description={gossip.text}
                    likesCount={gossip.likesCount || 0}
                    gossipVotesCount={gossip.gossipVotesCount || 0}
                    isUser={true}
                    pollIndex={gossip?.pollIndex}
                    isGossip={gossip?.isGossip}
                    messageType={"Text"}
                    discussionCount={gossip.discussionCount}
                />
            ))}
        </div>
    );
}

export default Gossips;
