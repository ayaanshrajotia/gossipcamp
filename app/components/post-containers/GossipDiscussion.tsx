// icons
import { HeartIcon } from "@heroicons/react/24/outline";

import Image from "next/image";
import React, { useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useTheme } from "next-themes";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import {
    deleteAndUpdateMessage,
    deleteMessageApi,
    toggleLikeMessage,
    updateLikeMessage,
} from "@/lib/slices/chatSlice";
import { useParams } from "next/navigation";
import { socket } from "@/app/StoreProvider";
import { useDebouncedCallback } from "use-debounce";
import toast from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";
import { useLongPress } from "@uidotdev/usehooks";
import { setGossipDiscussion } from "@/lib/slices/gossipDiscussionSlice";
import { useRouter } from "next/navigation";
import MessageBox from "./MessageBox";
import EmojiPicker from "emoji-picker-react";
// icons
import { FaceSmileIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import axiosInstance from "@/app/utils/axios";
import {
    addMessage,
    updateGossipVoteMessage,
    updateMessage,
} from "@/lib/slices/chatSlice";
import { v4 } from "uuid";
import { Theme } from "emoji-picker-react";
import { resetFileInput } from "@/app/utils/helper";
import { connectSocket } from "@/lib/slices/socketSlice";
import { setBlur } from "@/lib/slices/blurSlice";

function GossipDiscussion() {
    const { gossipDiscussion } = useSelector(
        (state: RootState) => state.gossipDiscussion
    );
    const {
        date,
        isUser,
        description,
        id,
        isLiked,
        likesCount,
        messageType,
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
    const [likesLoading, setLikesLoading] = useState(false);
    const [liked, setLiked] = useState(isLiked);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { profile } = useSelector((state: RootState) => state.auth);
    const inputRef = React.useRef<any>(null);

    const [messageText, setMessageText] = useState("");
    const [loading, setLoading] = useState(false);
    const [isEmojiPicker, setIsEmojiPicker] = useState(false);
    const [isPoll, setIsPoll] = useState(false);
    const [isImage, setIsImage] = useState(false);
    const [file, setFile] = useState<string | undefined>();
    const [fileData, setFileData] = useState<any>();
    const [pollOptions, setPollOptions] = useState([]);
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

    console.log({
        date,
        isUser,
        description,
        id,
        isLiked,
        likesCount,
        messageType,
        profileUrl,
        user,
        postImgUrl,
    });

    // const handleSendMessage = async (e: any) => {
    //     e?.preventDefault();
    //     dispatch(setBlur(false));
    //     setLoading(true);
    //     setFile(undefined);

    //     if (isPoll && pollOptions.length < 2) {
    //         toast.error("Poll must have at least 2 options!");
    //         setLoading(false);
    //         return;
    //     }

    //     if (!isImage && messageText.length === 0) {
    //         toast.error("Message cannot be empty!");
    //         setLoading(false);
    //         return;
    //     }

    //     let message = {
    //         _id: v4(),
    //         roomId: roomId,
    //         text: messageText,
    //         messageType: "Text",
    //         profile: {
    //             _id: profile?._id,
    //             fName: profile.fName,
    //             lName: profile.lName,
    //             avatar: profile.avatar,
    //         },
    //         // image: {
    //         //     url:
    //         //         (isImage && isPoll) || isImage
    //         //             ? "/images/image-loading.gif"
    //         //             : null,
    //         // },
    //         // pollOptions: (isImage && isPoll) || isPoll ? pollOptions : [],
    //         likesCount: 0,
    //         isLiked: false,
    //         gossipCount: 0,
    //         isGossipVoted: false,
    //     };

    //     const index = messages.length;
    //     setMessageText("");
    //     try {
    //         await dispatch(addMessage(message));
    //         setIsEmojiPicker(false);

    //         window.scrollTo({
    //             top: document.body.scrollHeight, // Scroll to the bottom
    //             behavior: "smooth",
    //         });

    //         let formData = new FormData();
    //         if (file) {
    //             formData.append("image", fileData);
    //         }
    //         formData.append("text", messageText);
    //         formData.append(
    //             "messageType",
    //             isImage && isPoll
    //                 ? "ImagePoll"
    //                 : isImage
    //                 ? "Image"
    //                 : isPoll
    //                 ? "Poll"
    //                 : "Text"
    //         );
    //         formData.append("profileId", profile?._id);
    //         formData.append("pollOptions", JSON.stringify(pollOptions));

    //         const response = await axiosInstance.post(
    //             "messages/send-message/" + roomId,
    //             formData,
    //             {
    //                 headers: {
    //                     "Content-Type": "multipart/form-data",
    //                 },
    //             }
    //         );

    //         if (response.status >= 200) {
    //             if (socket == null) {
    //                 await dispatch(connectSocket()).then(() => {
    //                     socket.on("message", (data: any) => {
    //                         let f = async () => {
    //                             await dispatch(addMessage(data));
    //                             window.scrollTo({
    //                                 top: document.body.scrollHeight, // Scroll to the bottom
    //                                 behavior: "smooth",
    //                             });
    //                         };
    //                         f();
    //                     });

    //                     socket.on("send-like-message", (data: any) => {
    //                         dispatch(updateLikeMessage(data));
    //                     });

    //                     socket.on("send-gossip-message", (data: any) => {
    //                         dispatch(updateGossipVoteMessage(data));
    //                     });

    //                     socket.emit("open-room", {
    //                         roomId: roomId.toString(),
    //                         profileId: profile?._id,
    //                     });
    //                 });
    //             }

    //             socket.emit("send-message", {
    //                 ...message,
    //                 pollOptions: pollOptions.map((option: any) => ({
    //                     option: option,
    //                     votes: 0,
    //                 })),
    //                 pollIndex: -1,
    //                 image: response.data.data.image,
    //                 _id: response.data.data._id,
    //             });
    //             console.log(response.data.data);
    //             await dispatch(
    //                 updateMessage({ index, message: response.data.data })
    //             );
    //             setTimeout(() => {
    //                 window.scrollTo({
    //                     top: document.body.scrollHeight, // Scroll to the bottom
    //                     behavior: "smooth",
    //                 });
    //             }, 1000);
    //             setLoading(false);
    //         }
    //     } catch (err: any) {
    //         // if (err.response.status === 409) {
    //         // this means that the message send has a not ssafe for viewing image
    //         // so we need to delete the message
    //         dispatch(
    //             updateMessage({
    //                 index,
    //                 message: {
    //                     ...message,
    //                     text: "This image is inappropriate!",
    //                     image: null,
    //                     messageType: "Text",
    //                 },
    //             })
    //         );
    //         setLoading(false);
    //         // }
    //         console.log(err);
    //         setLoading(false);
    //     }

    //     resetFileInput("inputTag");
    // };

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

    return (
        <motion.div className="fixed flex justify-center items-center z-[1111] w-screen h-screen backdrop-brightness-[.6] ">
            <div className="flex flex-col w-[75vw] h-[88vh] gap-6">
                {/* Gossip */}
                <motion.div
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                        dispatch(setGossipDiscussion(false));
                    }}
                    // onClick={() => dispatch(setGossipDiscussion("close"))}
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
                        className={`border-box relative max-w-[500px] w-fit flex flex-col border-[1px] border-stone-400 rounded-xl font-secondary bg-[url('https://camo.githubusercontent.com/cba518ead87b032dc6f1cbfc7fade27604449201ac1baf34d889f77f093f01ac/68747470733a2f2f7765622e77686174736170702e636f6d2f696d672f62672d636861742d74696c652d6461726b5f61346265353132653731393562366237333364393131306234303866303735642e706e67')] bg-zinc-200 px-3 py-3 pt-2 pb-2 dark:bg-college-dark-gray-3 dark:border-college-dark-gray-2 cursor-pointer ${
                            theme === "dark"
                                ? isUser
                                    ? "ml-auto box-shadow-yellow-static-dark"
                                    : "self-start box-shadow-static-dark"
                                : isUser
                                ? "ml-auto box-shadow-yellow-static"
                                : "self-start box-shadow-static"
                        }`}
                    >
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
                {/* Chatbox */}
                <AnimatePresence>
                    {gossipDiscussion && (
                        <motion.div
                            className={`bg-[url('https://camo.githubusercontent.com/cba518ead87b032dc6f1cbfc7fade27604449201ac1baf34d889f77f093f01ac/68747470733a2f2f7765622e77686174736170702e636f6d2f696d672f62672d636861742d74696c652d6461726b5f61346265353132653731393562366237333364393131306234303866303735642e706e67')] bg-[#ececec] dark:bg-black bg-fixed bg-contain w-[100%] mr-6 rounded-xl flex-grow flex flex-col p-5 pr-6 pb-6 gap-6 overflow-scroll shadow-xl`}
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
                            <MessageBox
                                key={321}
                                id={321}
                                isLiked={true}
                                messageType={"Text"}
                                date={"2021-09-09T00:00:00.000Z"}
                                profileUrl={"/images/avatar-1.png"}
                                user={"User"}
                                description={"This is a gossip"}
                                likesCount={0}
                                isUser={true}
                                isGossip={false}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
                {/* input */}
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
                            // onSubmit={handleSendMessage}
                            className="flex items-center gap-2 p-2.5 px-3 w-full bg-white rounded-xl border-[1px] border-stone-400 dark:border-college-dark-gray-3 dark:bg-college-dark-gray-3"
                        >
                            <input
                                ref={inputRef}
                                type="text"
                                value={messageText}
                                className="flex-1 bg-transparent outline-none resize-none font-secondary placeholder:text-college-dark-white-2 placeholder:dark:text-college-dark-white-2"
                                onChange={(e) => setMessageText(e.target.value)}
                                placeholder={"asdasda"}
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
