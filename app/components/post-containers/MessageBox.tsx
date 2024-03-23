import { MessagesBoxPropsType } from "@/app/utils/definitions";
import PostBox from "./PostBox";
import JoinLeaveBox from "./JoinLeaveBox";
import PollBox from "./PollBox";

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
    } else if (messageType === "Poll") {
        return (
            <PollBox
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
    } else
        return (
            <PostBox
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
}

export default MessageBox;
