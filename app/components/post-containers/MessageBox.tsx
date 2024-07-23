import { MessagesBoxPropsType } from "@/app/utils/definitions";
import JoinLeaveBox from "./JoinLeaveBox";
import PollBox from "./PollBox";
import TextImageBox from "./TextImageBox";
import GossipBox from "./GossipBox";

function MessageBox({
    bgcolor,
    textColor,
    className = "",
    date,
    profileUrl,
    postImgUrl,
    user,
    description,
    isUser,
    likesCount,
    id,
    pollOptions,
    isPollVoted,
    isLiked,
    pollIndex,
    gossipVotesCount,
    isGossipVoted,
    isGossip,
    messageType,
    ...props
}: MessagesBoxPropsType) {
    if (isGossip) {
        return (
            <GossipBox
                bgcolor={bgcolor}
                id={id}
                textColor={textColor}
                className={className}
                date={date}
                profileUrl={profileUrl}
                isLiked={isLiked}
                postImgUrl={postImgUrl}
                user={user}
                description={description}
                isUser={isUser}
                likesCount={likesCount}
                messageType={messageType}
                isGossipVoted={isGossipVoted}
                gossipVotesCount={gossipVotesCount}
                {...props}
            />
        );
    } else if (messageType === "Join Room" || messageType === "Leave Room") {
        return (
            <JoinLeaveBox
                bgcolor={bgcolor}
                textColor={textColor}
                className={className}
                date={date}
                profileUrl={profileUrl}
                postImgUrl={postImgUrl}
                user={user}
                description={description}
                isUser={isUser}
                likesCount={likesCount || 0} // Assign a default value of 0 if likesCount is undefined
                messageType={messageType}
                {...props}
            />
        );
    } else if (messageType === "Poll" || messageType === "ImagePoll") {
        return (
            <PollBox
                bgcolor={bgcolor}
                textColor={textColor}
                className={className}
                date={date}
                profileUrl={profileUrl}
                postImgUrl={postImgUrl}
                pollOptions={pollOptions}
                isPollVoted={isPollVoted}
                user={user}
                isLiked={isLiked}
                id={id}
                pollIndex={pollIndex}
                description={description}
                isUser={isUser}
                messageType={messageType}
                {...props}
            />
        );
    } else if (messageType === "Text" || messageType === "Image") {
        return (
            <TextImageBox
                bgcolor={bgcolor}
                id={id}
                textColor={textColor}
                className={className}
                date={date}
                profileUrl={profileUrl}
                isLiked={isLiked}
                postImgUrl={postImgUrl}
                user={user}
                description={description}
                isUser={isUser}
                likesCount={likesCount}
                messageType={messageType}
                isGossipVoted={isGossipVoted}
                gossipVotesCount={gossipVotesCount}
                {...props}
            />
        );
    }
}

export default MessageBox;
