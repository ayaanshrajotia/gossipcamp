import { MessagesBoxPropsType } from "@/app/utils/definitions";
import TextBox from "./TextBox";
import JoinLeaveBox from "./JoinLeaveBox";
import PollBox from "./PollBox";
import ImageBox from "./ImageBox";

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
    } else if (messageType === "Image") {
        return (
            <ImageBox
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
    } else
        return (
            <TextBox
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
