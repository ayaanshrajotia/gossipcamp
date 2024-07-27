// icons
import { HeartIcon } from "@heroicons/react/24/outline";

import Image from "next/image";
import { useState } from "react";
import { GossipContainerPropsType } from "@/app/utils/definitions";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useTheme } from "next-themes";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { toggleLikeMessage, updateLikeMessage } from "@/lib/slices/chatSlice";
import { useParams } from "next/navigation";
import { socket } from "@/app/StoreProvider";
import { useDebouncedCallback } from "use-debounce";
import { motion } from "framer-motion";
import { useLongPress } from "@uidotdev/usehooks";
import PeopleCount from "../PeopleCount";

function GossipContainer({
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
    isGossipVoted,
    gossipVotesCount,
    discussionCount,
    ...props
}: GossipContainerPropsType) {
    dayjs.extend(relativeTime); // use relative time plugin
    const { theme } = useTheme();
    const relativeDate = dayjs(date).fromNow();
    const dispatch = useDispatch<AppDispatch>();
    const roomId = useParams().roomId;
    const [likesLoading, setLikesLoading] = useState(false);
    const [gossip, setGossip] = useState(isGossipVoted);
    const [liked, setLiked] = useState(isLiked);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    // hook for long press
    const attrs = useLongPress(
        () => {
            setIsMenuOpen(true);
        },
        {
            onCancel: (event) => setIsMenuOpen(false),
            threshold: 200,
        }
    );

    const likeClickHandler = () => {
        setLiked((prev) => !prev);
        dispatch(updateLikeMessage({ messageId: id, isLiked: !liked }));
        likeMessageHandlerDebounced();
    };

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

    return (
        <motion.div whileTap={{ scale: 0.98 }}>
            {/* Main message box */}
            <div
                {...attrs}
                className={`border-box relative w-full flex flex-col border-[1px] rounded-xl font-secondary ${textColor} ${className} bg-white px-4 py-4 pt-4 pb-2 dark:bg-college-dark-gray-3 dark:border-college-dark-gray-2 cursor-pointer ${
                    theme === "dark"
                        ? isUser
                            ? "box-shadow-yellow-static-dark"
                            : "box-shadow-static-dark"
                        : isUser
                        ? "box-shadow-yellow-static"
                        : "box-shadow-static"
                }`}
                style={{ color: textColor }}
                {...props}
            >
                {/* Reactions Box */}
                <div className="flex absolute bottom-0 left-[16px] gap-2">
                    {/* Like button */}
                    <div
                        className=" translate-y-4  text-black text-xs py-0.5 px-1.5 h-[24px] rounded-xl flex items-center gap-1 cursor-pointer border-[1px] dark:bg-college-dark-gray-3 dark:border-college-dark-gray-2 dark:text-college-dark-white bg-white border-red-500"
                        onClick={likeClickHandler}
                    >
                        <div>
                            <HeartIcon
                                className={`h-[18px] w-[18px] text-red-500 cursor-pointer fill-red-500`}
                            />
                        </div>
                        {likesCount > 0 && (
                            <span className="">{likesCount}</span>
                        )}
                    </div>
                </div>
                {/* Data of the message box */}
                <div className="flex gap-2.5">
                    <div>
                        <div className="relative h-[60px] w-[60px]">
                            <Image
                                src={profileUrl}
                                sizes="33vw"
                                alt="avatar-1"
                                fill
                                className="object-cover rounded-full"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col w-full">
                        <div className="flex">
                            {/* Username */}
                            <div className="flex flex-col w-full">
                                <h2 className="max-[550px]:text-2xl font-secondary font-extrabold text-xl text-ellipsis overflow-hidden line-clamp-1 dark:text-college-dark-whit">
                                    @{user}
                                </h2>
                                {/* Description */}
                                <p className="leading-tight break-all">
                                    {description}
                                </p>
                            </div>
                                <PeopleCount
                                    width="w-[35px]"
                                    height="h-[35px]"
                                    margin="-ml-4"
                                    totalParticipants={discussionCount}
                                    className=""
                                />
                        </div>
                        <>
                            {postImgUrl && (
                                <div className="relative mt-3">
                                    <Image
                                        src={postImgUrl!}
                                        alt="avatar-1"
                                        width={0}
                                        height={0}
                                        sizes="33vw"
                                        className=" rounded-xl"
                                        style={{
                                            width: "100%",
                                            height: "auto",
                                        }}
                                    />
                                </div>
                            )}
                        </>
                    </div>
                </div>
                <div className="flex items-end justify-end gap-1">
                    <span className="text-xs text-right mt-1 tracking-tight text-college-dark-white-2">
                        {relativeDate}
                    </span>
                </div>
            </div>
        </motion.div>
    );
}

export default GossipContainer;
