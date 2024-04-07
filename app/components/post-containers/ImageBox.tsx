import Image from "next/image";
import { useState } from "react";
import { ImageBoxPropsType } from "@/app/utils/definitions";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// icons
import { HeartIcon as HeartIconFilled } from "@heroicons/react/24/solid";
import {
    EllipsisVerticalIcon,
    HeartIcon,
    TicketIcon,
} from "@heroicons/react/24/outline";
import { useTheme } from "next-themes";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import {
    deleteMessage,
    deleteMessageApi,
    toggleLikeMessage,
    updateLikeMessage,
} from "@/lib/slices/chatSlice";
import { useParams } from "next/navigation";
import { socket } from "@/app/StoreProvider";
import Dropdown from "../Dropdown";
import { useDebouncedCallback } from "use-debounce";
import toast from "react-hot-toast";

function ImageBox({
    isSend,
    bgcolor = "bg-white",
    textColor,
    className = "",
    date,
    profileUrl,
    postImgUrl,
    user,
    id,
    description,
    isUser,
    isLiked,
    messageType,
    likesCount,
    ...props
}: ImageBoxPropsType) {
    dayjs.extend(relativeTime); // use relative time plugin
    const relativeDate = dayjs(date).fromNow();
    // const { likesLoading } = useSelector((state: RootState) => state.chat);
    const [likesLoading, setLikesLoading] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const [liked, setLiked] = useState(isLiked);

    const roomId = useParams().roomId;
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // console.log(isLiked, "likesLoading");
    // need to use debouncing for like message
    const menuOptions = [
        {
            name: "Delete",
            action: async () => {
                dispatch(deleteMessage(id));
                toast.success("Message deleted successfully");
                await dispatch(deleteMessageApi(id));
            },
        },
    ];

    const likeMessageHandlerDebounced = useDebouncedCallback(async () => {
        setLikesLoading(true);
        if (liked == isLiked) return;
        await dispatch(toggleLikeMessage({ id, isLiked: !isLiked }));
        // connect statement
        setLikesLoading(false);
        socket.emit("like-message", {
            roomId,
            messageId: id,
            isLiked: !isLiked,
        });
    }, 1500);

    const likeClickHandler = () => {
        setLiked((prev) => !prev);
        dispatch(updateLikeMessage({ messageId: id, isLiked: !liked }));
        likeMessageHandlerDebounced();
    };

    const { theme } = useTheme();
    return (
        <div
            className={`border-box relative max-w-[450px] min-w-[300px] flex flex-col border-[1px] border-stone-400 rounded-xl font-secondary ${textColor} ${className} bg-white px-4 py-3 pt-4 pb-2 dark:bg-college-dark-gray-3 dark:border-college-dark-gray-2 ${
                theme === "dark"
                    ? isUser
                        ? "self-end box-shadow-yellow-static-dark"
                        : "self-start box-shadow-static-dark"
                    : isUser
                    ? "self-end box-shadow-yellow-static"
                    : "self-start box-shadow-static"
            }`}
            style={{ color: textColor }}
            {...props}
        >
            {isUser && (
                <EllipsisVerticalIcon
                    className="w-5 h-5 absolute right-1.5 top-2 cursor-pointer"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                />
            )}

            {isUser && isMenuOpen && (
                <Dropdown
                    handleOptions={() => {}}
                    options={menuOptions}
                    className="absolute -right-4 top-7"
                    onClick={() => setIsMenuOpen(false)}
                />
            )}

            <div
                className="absolute left-4 bottom-0 translate-y-4 bg-white text-black text-xs py-0.5 px-1.5 rounded-2xl flex items-center gap-1 cursor-pointer border-[1px] border-stone-400 dark:bg-college-dark-gray-3 dark:border-college-dark-gray-2 dark:text-college-dark-white"
                onClick={likeClickHandler}
            >
                {liked ? (
                    <HeartIconFilled className="h-4 w-4 text-red-500 cursor-pointer" />
                ) : (
                    <HeartIcon className="h-4 w-4 text-red-500 cursor-pointer" />
                )}
                {likesCount > 0 && <span className="">{likesCount}</span>}
            </div>
            <div className="flex gap-3 mb-2">
                <div>
                    <div className="relative h-[50px] w-[50px]">
                        <Image
                            src={profileUrl}
                            sizes="33vw"
                            alt="avatar-1"
                            fill
                            className="object-cover rounded-full"
                        />
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="flex justify-between items-center">
                        <h2 className="font-extrabold dark:text-college-dark-white">
                            @{user}
                        </h2>
                    </div>
                    <p className="leading-tight text-base">{description}</p>
                    <>
                        {postImgUrl && (
                            <div className="relative w-[350px] mt-3">
                                <Image
                                    src={postImgUrl!}
                                    alt="avatar-1"
                                    width={0}
                                    height={0}
                                    sizes="33vw"
                                    className=" rounded-xl"
                                    style={{ width: "100%", height: "auto" }}
                                />
                            </div>
                        )}
                    </>
                </div>
                {/* <Image
                    src={"/images/avatar-1.png"}
                    alt="image"
                    width={0}
                    height={0}
                    sizes="33vw"
                    style={{ width: "100%", height: "auto" }}
                /> */}
            </div>
            <div className="flex items-end justify-end gap-1">
                <span className="text-xs text-right mt-1 tracking-tight text-college-dark-white-2">
                    {relativeDate}
                </span>
            </div>
        </div>
    );
}

export default ImageBox;
