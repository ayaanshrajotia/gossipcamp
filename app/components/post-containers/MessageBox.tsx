import { MessagesBoxPropsType } from "@/app/utils/definitions";
import PostBox from "./PostBox";
import JoinLeaveBox from "./JoinLeaveBox";

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
    isLiked,
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
    } else
        return (
            <PostBox
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

export default MessageBox;
