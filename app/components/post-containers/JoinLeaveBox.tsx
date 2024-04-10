import { JoinLeaveBoxPropsType } from "@/app/utils/definitions";

function JoinLeaveBox({
    bgcolor = "bg-white",
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
}: JoinLeaveBoxPropsType) {
    return (
        <div className="bg-gray-200 flex text-sm w-fit px-4 py-2 self-center rounded-xl dark:bg-college-dark-gray-2">
            {description}
        </div>
    );
}

export default JoinLeaveBox;
