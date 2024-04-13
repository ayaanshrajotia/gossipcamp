import { MessagesBoxPropsType } from "@/app/utils/definitions";
import JoinLeaveBox from "./JoinLeaveBox";
import PollBox from "./PollBox";
import TextImageBox from "./TextImageBox";

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
    messageType,
    ...props
}: MessagesBoxPropsType) {
    if (messageType === "Join Room" || messageType === "Leave Room") {
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
                id={id}
                pollIndex={pollIndex}
                description={description}
                isUser={isUser}
                messageType={messageType}
                {...props}
            />
        );
    } else {
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
                {...props}
            />
        );
    }
}

export default MessageBox;
