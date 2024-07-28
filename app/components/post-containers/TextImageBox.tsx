// icons
import { HeartIcon, StarIcon } from "@heroicons/react/24/outline";

import Image from "next/image";
import { useEffect, useState } from "react";
import { TextImageBoxPropsType } from "@/app/utils/definitions";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useTheme } from "next-themes";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import {
    deleteAndUpdateMessage,
    deleteMessageApi,
    toggleGossipMessage,
    toggleLikeMessage,
    updateGossipVoteSelfMessage,
    updateLikeMessage,
} from "@/lib/slices/chatSlice";
import { useParams } from "next/navigation";
import { socket } from "@/app/StoreProvider";
import { useDebouncedCallback } from "use-debounce";
import toast from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";
import { useLongPress } from "@uidotdev/usehooks";
import ConfettiExplosion from "react-confetti-explosion";
function TextImageBox({
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
    isGossip,
    ...props
}: TextImageBoxPropsType) {
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

    const handleDelete = async () => {
        dispatch(deleteAndUpdateMessage({ messageId: id }));
        await dispatch(deleteMessageApi(id));
        toast.success("Message deleted successfully");
        socket.emit("delete-message", {
            roomId,
            messageId: id,
        });
    };

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

    const gossipClickHandler = () => {
        gossipVoteHandlerDebounced();
        setGossip((prev) => !prev);
        dispatch(
            updateGossipVoteSelfMessage({
                messageId: id,
                isGossipVoted: !gossip,
            })
        );
    };

    const gossipVoteHandlerDebounced = useDebouncedCallback(async () => {
        setLikesLoading(true);
        if (gossip == isGossipVoted) return;
        await dispatch(
            toggleGossipMessage({ id, isGossipVoted: !isGossipVoted })
        );
        // connect statement
        setLikesLoading(false);
        socket.emit("gossip-vote-message", {
            roomId,
            messageId: id,
            isGossipVoted: !isGossipVoted,
        });
    }, 1500);

    return (
        <motion.div whileTap={{ scale: 0.98 }}>
            {/* Main message box */}

            <div
                {...attrs}
                className={`border-box relative max-w-[500px] w-fit flex flex-col border-[1px] border-stone-400 rounded-xl font-secondary ${textColor} ${className} bg-white px-3 py-3 pt-2 pb-2 dark:bg-college-dark-gray-3 dark:border-college-dark-gray-2 cursor-pointer ${
                    theme === "dark"
                        ? isUser
                            ? "ml-auto box-shadow-yellow-static-dark"
                            : "self-start box-shadow-static-dark"
                        : isUser
                        ? "ml-auto box-shadow-yellow-static"
                        : "self-start box-shadow-static"
                }`}
                style={{ color: textColor }}
                {...props}
            >
                {true && (
                    <ConfettiExplosion
                        force={0.6}
                        duration={2500}
                        particleCount={80}
                        width={1000}
                    />
                )}
                <AnimatePresence>
                    {isUser &&
                        isMenuOpen &&
                        description !== "This message is deleted" && (
                            <motion.button
                                initial={{ x: 300, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: 800, opacity: 0 }}
                                key={"delete"}
                                className={`absolute right-2 top-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-medium transition-all`}
                                onClick={() => {
                                    setIsMenuOpen(false);
                                    handleDelete();
                                }}
                            >
                                DELETE
                            </motion.button>
                        )}
                </AnimatePresence>

                {/* Reactions Box */}
                <div className="flex absolute bottom-0 left-[16px] gap-2">
                    {/* Gossip count */}
                    <div
                        className=" translate-y-4 bg-white text-black text-xs py-0.5 px-1.5 h-[24px] rounded-2xl flex items-center gap-1 cursor-pointer border-[1px] dark:bg-college-dark-gray-3 dark:border-college-dark-gray-2 dark:text-college-dark-white border-yellow-500"
                        onClick={gossipClickHandler}
                    >
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.8 }}
                            key={"gossip"}
                        >
                            <StarIcon
                                className={`h-[18px] w-[18px] text-yellow-500 ${
                                    gossip
                                        ? "fill-yellow-500"
                                        : "fill-transparent"
                                }`}
                            />
                        </motion.div>
                        {gossipVotesCount > 0 && (
                            <span className="">{gossipVotesCount}</span>
                        )}
                        {/* <span>4</span> */}
                    </div>
                    {/* Like button */}
                    <div
                        className=" translate-y-4  text-black text-xs py-0.5 px-1.5 h-[24px] rounded-xl flex items-center gap-1 cursor-pointer border-[1px] dark:bg-college-dark-gray-3 dark:border-college-dark-gray-2 dark:text-college-dark-white bg-white border-red-500"
                        onClick={likeClickHandler}
                    >
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.8 }}
                            key={"like"}
                        >
                            <HeartIcon
                                className={`h-[18px] w-[18px] text-red-500 cursor-pointer ${
                                    liked ? "fill-red-500" : "fill-transparent"
                                }`}
                            />
                        </motion.div>
                        {likesCount > 0 && (
                            <span className="">{likesCount}</span>
                        )}
                    </div>
                </div>
                {/* Data of the message box */}
                <div className="flex gap-2.5 pr-[60px]">
                    <div>
                        <div className="relative h-[40px] w-[40px]">
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
                        {/* Username */}
                        <div className="flex justify-between items-center mr-8">
                            <h2 className="font-extrabold dark:text-college-dark-white">
                                @{user}
                            </h2>
                        </div>
                        {/* Description */}
                        <p className="leading-tight break-all text-[15px]">
                            {description}
                        </p>
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

export default TextImageBox;
