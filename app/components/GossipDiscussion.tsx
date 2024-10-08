// icons
import { HeartIcon } from "@heroicons/react/24/outline";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useTheme } from "next-themes";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { useParams } from "next/navigation";
import { socket } from "@/app/StoreProvider";
import { useDebouncedCallback } from "use-debounce";
import toast from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";
import { useLongPress } from "@uidotdev/usehooks";
import {
    addGossipDiscussionMessage,
    getAllGossipMessages,
    setGossipDiscussion,
    updateGossipDiscussionMessage,
} from "@/lib/slices/gossipDiscussionSlice";
import { useRouter } from "next/navigation";
import EmojiPicker from "emoji-picker-react";
// icons
import { FaceSmileIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import axiosInstance from "@/app/utils/axios";
import { v4 } from "uuid";
import { Theme } from "emoji-picker-react";
import { capitalizeFirstLetter, resetFileInput } from "@/app/utils/helper";
import { connectSocket } from "@/lib/slices/socketSlice";
import { setBlur } from "@/lib/slices/blurSlice";
import { toggleLikeMessage, updateLikeMessage } from "@/lib/slices/chatSlice";
import GossipMessageBox from "./post-containers/GossipMessageBox";
import Skeleton from "react-loading-skeleton";

var timer: any = null;
let prevheight = 0;

function GossipDiscussion() {
    const {
        gossipDiscussion,
        gossipDiscussionMessages,
        gossipDiscussionMessagesLoading,
        hasNextPage,
    } = useSelector((state: RootState) => state.gossipDiscussion);
    const {
        date,
        isUser,
        description,
        id,
        isLiked,
        likesCount,
        profileUrl,
        user,
        postImgUrl,
    } = useSelector(
        (state: RootState) => state.gossipDiscussion.gossipDisscussionData
    );
    const router = useRouter();
    dayjs.extend(relativeTime); // use relative time plugin
    const { theme } = useTheme();
    const relativeDate = dayjs(date).fromNow();
    const dispatch = useDispatch<AppDispatch>();
    const roomId = useParams().roomId;
    const [liked, setLiked] = useState(isLiked);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { profile } = useSelector((state: RootState) => state.auth);
    const inputRef = React.useRef<any>(null);
    const [likesLoading, setLikesLoading] = useState(false);
    const [messageText, setMessageText] = useState("");
    const [loading, setLoading] = useState(false);
    const [isEmojiPicker, setIsEmojiPicker] = useState(false);
    const [offset, setOffset] = useState(0);
    const [messagesLoading, setMessagesLoading] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    // hook for long press
    const attrs = useLongPress(
        () => {
            setIsMenuOpen(true);
        },
        {
            onCancel: () => setIsMenuOpen(false),
            threshold: 200,
        }
    );

    useEffect(() => {
        setMessagesLoading(true);
        setTimeout(() => {
            dispatch(
                getAllGossipMessages({
                    roomId: roomId.toString(),
                    offset: offset,
                    messageId: id,
                })
            ).then(() => {
                setMessagesLoading(false);
                if (offset == 0) {
                    setTimeout(() => {
                        containerRef.current?.scrollTo({
                            top: containerRef.current?.scrollHeight,
                        });
                    }, 0.1);
                } else {
                    setTimeout(() => {
                        containerRef.current?.scrollTo({
                            top:
                                containerRef?.current?.scrollHeight ||
                                1000 - prevheight, // Scroll to the bottom
                        });
                    }, 1000);
                }
                timer = setTimeout(() => {
                    clearTimeout(timer);
                    timer = null;
                }, 3000);
            });
        }, 1000);
    }, [dispatch, roomId, offset]);

    useEffect(() => {
        socket.emit("open-gossip-room", {
            roomId: roomId.toString(),
            messageId: id,
        });
        socket.on("gossip-message", (data: any) => {
            // console.log("Gossip message received", data);
            let f = async () => {
                await dispatch(addGossipDiscussionMessage(data));
                containerRef.current?.scrollTo({
                    top: containerRef?.current.scrollHeight, // Scroll to the bottom
                    behavior: "smooth",
                });
            };
            f();
        });

        return () => {
            socket.emit("close-gossip-room", {
                roomId: roomId.toString(),
                messageId: id,
            });
            socket.off("gossip-message");
        };
    }, []);

    useEffect(() => {
        const handleScroll: any = () => {
            if (
                !gossipDiscussionMessagesLoading &&
                timer === null &&
                hasNextPage &&
                (containerRef.current?.scrollHeight ||
                    1000 - (containerRef.current?.clientHeight || 1000)) < -800
            ) {
                setOffset(gossipDiscussionMessages.length);

                prevheight = containerRef.current?.scrollHeight || 1000;

                timer = setTimeout(() => {
                    clearTimeout(timer);
                    timer = null;
                }, 2000);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [gossipDiscussionMessagesLoading]);

    const handleSendMessage = async (e: any) => {
        e?.preventDefault();
        dispatch(setBlur(false));
        setLoading(true);

        if (messageText.length === 0) {
            toast.error("Message cannot be empty!");
            setLoading(false);
            return;
        }

        const index = gossipDiscussionMessages.length;
        let message = {
            _id: v4(),
            room: roomId.toString(),
            text: messageText,
            messageType: "Text",
            profile: {
                _id: profile?._id,
                fName: profile.fName,
                lName: profile.lName,
                avatar: profile.avatar,
            },
            parentMessage: id,
        };
        try {
            setMessageText("");
            await dispatch(addGossipDiscussionMessage(message));
            setIsEmojiPicker(false);

            containerRef.current?.scrollTo({
                top: containerRef.current?.scrollHeight, // Scroll to the bottom
                behavior: "smooth",
            });

            const response = await axiosInstance.post(
                "messages/send-gossip-message/" + roomId + "/" + id,
                { text: messageText }
            );

            if (response.status >= 200) {
                if (socket == null) {
                    await dispatch(connectSocket()).then(() => {
                        socket.on("message", (data: any) => {
                            let f = async () => {
                                await dispatch(
                                    addGossipDiscussionMessage(data)
                                );
                                containerRef.current?.scrollTo({
                                    top: containerRef.current?.scrollHeight, // Scroll to the bottom
                                    behavior: "smooth",
                                });
                            };
                            f();
                        });

                        socket.emit("open-room", {
                            roomId: roomId.toString(),
                            profileId: profile?._id,
                        });

                        socket.emit("open-gossip-room", {
                            roomId: roomId.toString(),
                            messageId: id,
                        });
                        socket.on("gossip-message", (data: any) => {
                            let f = async () => {
                                await dispatch(
                                    addGossipDiscussionMessage(data)
                                );
                                containerRef.current?.scrollTo({
                                    top: containerRef.current?.scrollHeight, // Scroll to the bottom
                                    behavior: "smooth",
                                });
                            };
                            f();
                        });
                    });
                }

                socket.emit("send-gossip-message", {
                    ...message,
                    _id: response.data.data._id,
                });
                await dispatch(
                    updateGossipDiscussionMessage({
                        index,
                        message: response.data.data,
                    })
                );
                setTimeout(() => {
                    containerRef.current?.scrollTo({
                        top: containerRef.current?.scrollHeight, // Scroll to the bottom
                        behavior: "smooth",
                    });
                }, 1000);
                setLoading(false);
            }
        } catch (err: any) {
            // if (err.response.status === 409) {
            // this means that the message send has a not ssafe for viewing image
            // so we need to delete the message
            dispatch(
                updateGossipDiscussionMessage({
                    index,
                    message: {
                        ...message,
                        text: "This image is inappropriate!",
                        image: null,
                        messageType: "Text",
                    },
                })
            );
            setLoading(false);
            // }
            console.log(err);
            setLoading(false);
        }

        resetFileInput("inputTag");
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

    return (
        <motion.div className="fixed flex justify-center items-center z-[1111] w-screen h-screen backdrop-brightness-[.6]">
            <div className="relative flex flex-col w-[75vw] h-[88vh] gap-6">
                <div
                    className={`flex gap-4 items-start ${
                        theme === "dark"
                            ? isUser
                                ? "ml-auto"
                                : "self-start flex-row-reverse"
                            : isUser
                            ? "ml-auto"
                            : "self-start flex-row-reverse"
                    }`}
                >
                    {postImgUrl && (
                        <motion.div
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                                dispatch(setGossipDiscussion(false));
                            }}
                            initial={{
                                y: -120,
                            }}
                            animate={{
                                y: 0,
                            }}
                            exit={{ y: -120 }}
                            transition={{ type: "spring", stiffness: 100 }}
                            className="relative"
                        >
                            <Image
                                src={postImgUrl!}
                                alt="avatar-1"
                                width={0}
                                height={0}
                                sizes="33vw"
                                className={`rounded-xl bg-white dark:bg-college-dark-gray-2  ${
                                    theme === "dark"
                                        ? isUser
                                            ? "box-shadow-yellow-static-dark"
                                            : "box-shadow-static-dark"
                                        : isUser
                                        ? "box-shadow-yellow-static"
                                        : "box-shadow-static"
                                }`}
                                style={{
                                    width: "auto",
                                    height: "90px",
                                }}
                            />
                        </motion.div>
                    )}
                    {/* Gossip */}
                    <motion.div
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                            dispatch(setGossipDiscussion(false));
                        }}
                        initial={{
                            y: -120,
                        }}
                        animate={{
                            y: 0,
                        }}
                        exit={{ y: -120 }}
                        transition={{ type: "spring", stiffness: 100 }}
                    >
                        {/* Main message box */}
                        <div
                            {...attrs}
                            className={`border-box relative max-w-[800px] w-fit flex flex-col border-[1px] border-stone-400 rounded-xl font-secondary gossip-bg px-3 py-3 pt-2 pb-2 bg-white dark:bg-college-dark-gray-2 dark:border-college-dark-gray-2 cursor-pointer ${
                                theme === "dark"
                                    ? isUser
                                        ? "ml-auto box-shadow-yellow-static-dark"
                                        : "self-start box-shadow-static-dark"
                                    : isUser
                                    ? "ml-auto box-shadow-yellow-static"
                                    : "self-start box-shadow-static"
                            }`}
                        >
                            {/* Reactions Box */}
                            <div className="flex absolute bottom-0 left-[16px] gap-2">
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
                                                liked
                                                    ? "fill-red-500"
                                                    : "fill-transparent"
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
                                    <div className="relative h-[55px] w-[55px]">
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
                                        <h2 className="font-extrabold dark:text-college-dark-white text-lg">
                                            @{user}
                                        </h2>
                                    </div>
                                    {/* Description */}
                                    <p className="leading-tight break-all text-base">
                                        {description}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-end justify-end gap-1">
                                <span className="text-xs text-right mt-1 tracking-tight text-college-dark-white-2">
                                    {relativeDate}
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </div>
                {/* Chatbox */}
                <AnimatePresence>
                    {gossipDiscussion && (
                        <motion.div
                            className={`relative bg-white dark:bg-college-dark-gray-1 w-[100%] h-0 mr-6 rounded-xl flex-grow flex flex-col shadow-xl`}
                            initial={{ scaleY: 0, scaleX: 0 }}
                            animate={{ scaleY: 1, scaleX: 1 }}
                            exit={{ scaleY: 0, scaleX: 0 }}
                            style={{ transformOrigin: "top right" }}
                            transition={{
                                type: "spring",
                                stiffness: 100,
                                duration: 0.3,
                                delay: 0.15,
                                damping: 15,
                            }}
                        >
                            <div
                                className={`bg-[url('https://camo.githubusercontent.com/cba518ead87b032dc6f1cbfc7fade27604449201ac1baf34d889f77f093f01ac/68747470733a2f2f7765622e77686174736170702e636f6d2f696d672f62672d636861742d74696c652d6461726b5f61346265353132653731393562366237333364393131306234303866303735642e706e67')] bg-fixed bg-contain bg-center h-full w-full absolute top-0 left-0 invert-[15%] dark:invert-[80%] transition-all duration-300`}
                            ></div>
                            <div
                                ref={containerRef}
                                className="overflow-scroll p-5 pr-6 pb-6 z-[100]"
                            >
                                {offset === 0 && messagesLoading ? (
                                    <div className="flex flex-col-reverse gap-4 h-full z-[1]">
                                        <div className="self-end">
                                            <Skeleton
                                                count={2}
                                                width={200}
                                                baseColor={
                                                    theme === "dark"
                                                        ? "#202020"
                                                        : "#e0dfdf"
                                                }
                                                highlightColor={
                                                    theme === "dark"
                                                        ? "#444"
                                                        : "#f2f2f2"
                                                }
                                            />
                                        </div>
                                        <Skeleton
                                            count={2}
                                            width={200}
                                            baseColor={
                                                theme === "dark"
                                                    ? "#202020"
                                                    : "#e0dfdf"
                                            }
                                            highlightColor={
                                                theme === "dark"
                                                    ? "#444"
                                                    : "#f2f2f2"
                                            }
                                        />
                                        <Skeleton
                                            count={2}
                                            width={200}
                                            baseColor={
                                                theme === "dark"
                                                    ? "#202020"
                                                    : "#e0dfdf"
                                            }
                                            highlightColor={
                                                theme === "dark"
                                                    ? "#444"
                                                    : "#f2f2f2"
                                            }
                                        />
                                        <div className="self-end">
                                            <Skeleton
                                                count={2}
                                                width={200}
                                                baseColor={
                                                    theme === "dark"
                                                        ? "#202020"
                                                        : "#e0dfdf"
                                                }
                                                highlightColor={
                                                    theme === "dark"
                                                        ? "#444"
                                                        : "#f2f2f2"
                                                }
                                            />
                                        </div>
                                        <div className="self-end">
                                            <Skeleton
                                                count={2}
                                                width={200}
                                                baseColor={
                                                    theme === "dark"
                                                        ? "#202020"
                                                        : "#e0dfdf"
                                                }
                                                highlightColor={
                                                    theme === "dark"
                                                        ? "#444"
                                                        : "#f2f2f2"
                                                }
                                            />
                                        </div>
                                        <Skeleton
                                            count={2}
                                            width={200}
                                            baseColor={
                                                theme === "dark"
                                                    ? "#202020"
                                                    : "#e0dfdf"
                                            }
                                            highlightColor={
                                                theme === "dark"
                                                    ? "#444"
                                                    : "#f2f2f2"
                                            }
                                        />
                                        <Skeleton
                                            count={2}
                                            width={200}
                                            baseColor={
                                                theme === "dark"
                                                    ? "#202020"
                                                    : "#e0dfdf"
                                            }
                                            highlightColor={
                                                theme === "dark"
                                                    ? "#444"
                                                    : "#f2f2f2"
                                            }
                                        />
                                        <div className="self-end">
                                            <Skeleton
                                                count={2}
                                                width={200}
                                                baseColor={
                                                    theme === "dark"
                                                        ? "#202020"
                                                        : "#e0dfdf"
                                                }
                                                highlightColor={
                                                    theme === "dark"
                                                        ? "#444"
                                                        : "#f2f2f2"
                                                }
                                            />
                                        </div>
                                        <Skeleton
                                            count={2}
                                            width={200}
                                            baseColor={
                                                theme === "dark"
                                                    ? "#202020"
                                                    : "#e0dfdf"
                                            }
                                            highlightColor={
                                                theme === "dark"
                                                    ? "#444"
                                                    : "#f2f2f2"
                                            }
                                        />
                                        <Skeleton
                                            count={2}
                                            width={200}
                                            baseColor={
                                                theme === "dark"
                                                    ? "#202020"
                                                    : "#e0dfdf"
                                            }
                                            highlightColor={
                                                theme === "dark"
                                                    ? "#444"
                                                    : "#f2f2f2"
                                            }
                                        />
                                        <div className="self-end">
                                            <Skeleton
                                                count={2}
                                                width={200}
                                                baseColor={
                                                    theme === "dark"
                                                        ? "#202020"
                                                        : "#e0dfdf"
                                                }
                                                highlightColor={
                                                    theme === "dark"
                                                        ? "#444"
                                                        : "#f2f2f2"
                                                }
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-6">
                                        {gossipDiscussionMessages.length ===
                                            0 && (
                                            <h1 className="font-bold text-xl font-secondary text-center">
                                                No chats to show!
                                            </h1>
                                        )}
                                        {gossipDiscussionMessages.map(
                                            (message: any) => {
                                                return (
                                                    <GossipMessageBox
                                                        key={message?._id}
                                                        id={message?._id}
                                                        messageType={
                                                            message.messageType
                                                        }
                                                        date={message.updatedAt}
                                                        profileUrl={
                                                            message.profile
                                                                ?.avatar
                                                        }
                                                        user={
                                                            capitalizeFirstLetter(
                                                                message.profile
                                                                    ?.fName
                                                            ) +
                                                            capitalizeFirstLetter(
                                                                message.profile
                                                                    ?.lName
                                                            )
                                                        }
                                                        description={
                                                            message.text
                                                        }
                                                        isUser={
                                                            message.profile
                                                                ?._id ===
                                                            profile?._id
                                                        }
                                                    />
                                                );
                                            }
                                        )}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                {/* Inputbox */}
                <AnimatePresence>
                    <motion.div
                        className={`max-[700px]:bottom-20 bottom-4 sticky rounded-2xl flex flex-col w-[75vw] shadow-xl`}
                        initial={{ scaleY: 0, scaleX: 0 }}
                        animate={{ scaleY: 1, scaleX: 1 }}
                        exit={{ scaleY: 0, scaleX: 0 }}
                        style={{ transformOrigin: "top right" }}
                        transition={{
                            type: "spring",
                            stiffness: 100,
                            duration: 0.3,
                            delay: 0.25,
                            damping: 15,
                        }}
                    >
                        {/* Sticker Menu */}
                        <EmojiPicker
                            open={isEmojiPicker}
                            width={400}
                            height={400}
                            theme={theme as Theme}
                            // className="absolute top-0"
                            style={{
                                position: "absolute",
                                bottom: "60px",
                                right: "0px",
                            }}
                            onEmojiClick={(e) => {
                                const curPosition =
                                    inputRef.current?.selectionStart;
                                if (
                                    curPosition === undefined ||
                                    curPosition == null
                                )
                                    return;
                                const text = messageText;
                                const newText =
                                    text.slice(0, curPosition) +
                                    e.emoji +
                                    text.slice(curPosition);
                                setMessageText(newText);
                                setIsEmojiPicker(false);
                            }}
                        />
                        <form
                            onSubmit={handleSendMessage}
                            className="flex items-center gap-2 p-2.5 px-3 w-full bg-white rounded-xl border-[1px] border-stone-400 dark:border-college-dark-gray-3 dark:bg-college-dark-gray-3"
                        >
                            <input
                                ref={inputRef}
                                type="text"
                                value={messageText}
                                className="flex-1 bg-transparent outline-none resize-none font-secondary placeholder:text-college-dark-white-2 placeholder:dark:text-college-dark-white-2"
                                onChange={(e) => setMessageText(e.target.value)}
                                placeholder={"Type a Gossip!"}
                            />
                            <FaceSmileIcon
                                className="w-6 h-6 cursor-pointer stroke-[#565759] dark:stroke-college-dark-white-2"
                                onClick={() =>
                                    setIsEmojiPicker((prev) => !prev)
                                }
                            />
                            <button type="submit">
                                <PaperAirplaneIcon className="w-6 h-6 stroke-[#565759] dark:stroke-college-dark-white-2" />
                            </button>
                        </form>
                    </motion.div>
                </AnimatePresence>
            </div>
        </motion.div>
    );
}

export default GossipDiscussion;
