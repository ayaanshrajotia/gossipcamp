"use client";

// icons
import { FaceSmileIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { ChartBarIcon, PhotoIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import axiosInstance from "@/app/utils/axios";
import { useParams } from "next/navigation";
import { socket } from "@/app/StoreProvider";
import {
    addMessage,
    updateGossipVoteMessage,
    updateLikeMessage,
    updateMessage,
} from "@/lib/slices/chatSlice";
import { v4 } from "uuid";
import EmojiPicker from "emoji-picker-react";
import { useTheme } from "next-themes";
import { Theme } from "emoji-picker-react";
import PollMenu from "@/app/components/input-menus/PollMenu";
import ImageMenu from "@/app/components/input-menus/ImageMenu";
import { resetFileInput } from "@/app/utils/helper";
import { connectSocket } from "@/lib/slices/socketSlice";
import { setBlur } from "@/lib/slices/blurSlice";
import toast from "react-hot-toast";
import { AnimatePresence } from "framer-motion";

function RoomLayout({ children }: { children: React.ReactNode }) {
    let { roomId } = useParams();
    const { theme } = useTheme();
    const dispatch = useDispatch<AppDispatch>();
    const { messages } = useSelector((state: RootState) => state.chat);
    const { profile } = useSelector((state: RootState) => state.auth);
    const { blur } = useSelector((state: RootState) => state.blur);
    const inputRef = React.useRef<any>(null);
    const fileInputRef = React.useRef<any>(null);

    const [messageText, setMessageText] = useState("");
    const [loading, setLoading] = useState(false);
    const [isEmojiPicker, setIsEmojiPicker] = useState(false);
    const [isPollMenuOpen, setIsPollMenuOpen] = useState(false);
    const [isImageMenuOpen, setIsImageMenuOpen] = useState(false);
    const [isPoll, setIsPoll] = useState(false);
    const [isImage, setIsImage] = useState(false);
    const [file, setFile] = useState<string | undefined>();
    const [fileData, setFileData] = useState<any>();
    const [pollOptions, setPollOptions] = useState([]);

    const { gossipDiscussion } = useSelector(
        (state: RootState) => state.gossipDiscussion
    );

    const handleSendMessage = async (e: any) => {
        e?.preventDefault();
        dispatch(setBlur(false));
        setLoading(true);
        setFile(undefined);

        if (isPoll && pollOptions.length < 2) {
            toast.error("Poll must have at least 2 options!");
            setLoading(false);
            setIsImage(false);
            setIsPoll(false);
            setIsPollMenuOpen(false);
            return;
        }

        if (!isImage && messageText.length === 0) {
            toast.error("Message cannot be empty!");
            setLoading(false);
            setIsImage(false);
            setIsPoll(false);
            setIsPollMenuOpen(false);
            return;
        }

        let message = {
            _id: v4(),
            roomId: roomId,
            text: messageText,
            messageType:
                isImage && isPoll
                    ? "ImagePoll"
                    : isImage
                    ? "Image"
                    : isPoll
                    ? "Poll"
                    : "Text",
            profile: {
                _id: profile?._id,
                fName: profile.fName,
                lName: profile.lName,
                avatar: profile.avatar,
            },
            image: {
                url:
                    (isImage && isPoll) || isImage
                        ? "/images/image-loading.gif"
                        : null,
            },
            pollOptions: (isImage && isPoll) || isPoll ? pollOptions : [],
            likesCount: 0,
            isLiked: false,
            gossipVotesCount: 0,
            isGossipVoted: false,
        };

        const index = messages.length;
        setMessageText("");
        try {
            await dispatch(addMessage(message));
            setIsPollMenuOpen(false);
            setIsEmojiPicker(false);

            window.scrollTo({
                top: document.body.scrollHeight, // Scroll to the bottom
                behavior: "smooth",
            });

            let formData = new FormData();
            if (file) {
                formData.append("image", fileData);
            }
            formData.append("text", messageText);
            formData.append(
                "messageType",
                isImage && isPoll
                    ? "ImagePoll"
                    : isImage
                    ? "Image"
                    : isPoll
                    ? "Poll"
                    : "Text"
            );
            formData.append("profileId", profile?._id);
            formData.append("pollOptions", JSON.stringify(pollOptions));

            const response = await axiosInstance.post(
                "messages/send-message/" + roomId,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (response.status >= 200) {
                if (socket == null) {
                    await dispatch(connectSocket()).then(() => {
                        socket.on("message", (data: any) => {
                            let f = async () => {
                                await dispatch(addMessage(data));
                                window.scrollTo({
                                    top: document.body.scrollHeight, // Scroll to the bottom
                                    behavior: "smooth",
                                });
                            };
                            f();
                        });

                        socket.on("send-like-message", (data: any) => {
                            dispatch(updateLikeMessage(data));
                        });

                        socket.on("send-gossip-message", (data: any) => {
                            dispatch(updateGossipVoteMessage(data));
                        });

                        socket.emit("open-room", {
                            roomId: roomId.toString(),
                            profileId: profile?._id,
                        });
                    });
                }

                socket.emit("send-message", {
                    ...message,
                    pollOptions: pollOptions.map((option: any) => ({
                        option: option,
                        votes: 0,
                    })),
                    pollIndex: -1,
                    image: response.data.data.image,
                    _id: response.data.data._id,
                });
                console.log(response.data.data);
                await dispatch(
                    updateMessage({ index, message: response.data.data })
                );
                setTimeout(() => {
                    window.scrollTo({
                        top: document.body.scrollHeight, // Scroll to the bottom
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
                updateMessage({
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
        setIsImage(false);
        setIsPoll(false);
        setIsPollMenuOpen(false);
    };

    function handleChange(e: any) {
        dispatch(setBlur(true));
        setIsImage(true);
        setFile(URL.createObjectURL(e.target.files[0]));
        setFileData(e.target.files[0]);
        setIsImageMenuOpen(true);
    }

    const getPollOptions = (options: any) => {
        setPollOptions((prev) => options);
    };

    let title = "";

    title =
        isImage && isPoll
            ? "Add poll with image!"
            : isImage
            ? "Write a caption!"
            : isPoll
            ? "Write poll question!"
            : "Type a message!";

    return (
        <>
            <div
                className={`bg-[url('https://camo.githubusercontent.com/cba518ead87b032dc6f1cbfc7fade27604449201ac1baf34d889f77f093f01ac/68747470733a2f2f7765622e77686174736170702e636f6d2f696d672f62672d636861742d74696c652d6461726b5f61346265353132653731393562366237333364393131306234303866303735642e706e67')] bg-fixed bg-contain h-full w-full absolute top-0 left-0 invert-[15%] dark:invert-[80%] transition-all duration-300 ${
                    blur || gossipDiscussion
                        ? "blur-md pointer-events-none"
                        : "blur-none"
                }`}
            ></div>
            <div
                className={`min-h-screen h-full relative w-full ${
                    gossipDiscussion ? `filter-none` : ""
                }`}
            >
                {children}
                <div
                    className={`max-[700px]:bottom-20 bottom-4 sticky rounded-2xl flex flex-col mx-6 ${
                         gossipDiscussion
                            ? "blur-md pointer-events-none"
                            : "blur-none"
                    }`}
                >
                    {/* Image Menu */}
                    <AnimatePresence>
                        {file && (
                            <ImageMenu
                                file={file}
                                closeFileMenu={() => {
                                    setIsImageMenuOpen(false);
                                    setFile(undefined);
                                    setFileData(undefined);
                                    setIsImage(false);
                                    resetFileInput("inputTag");
                                    !isPoll && dispatch(setBlur(false));
                                }}
                            />
                        )}
                    </AnimatePresence>
                    {/* Poll Menu */}
                    <AnimatePresence>
                        {isPollMenuOpen && (
                            <div>
                                <PollMenu
                                    closePollMenu={() => {
                                        setIsPollMenuOpen(false);
                                        setIsPoll(false);
                                        !isImage && dispatch(setBlur(false));
                                    }}
                                    getPollOptions={getPollOptions}
                                />
                            </div>
                        )}
                    </AnimatePresence>

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
                        <div className="flex gap-1 items-center">
                            <ChartBarIcon
                                className="w-5 h-5 cursor-pointer text-[#565759] dark:text-college-dark-white-2"
                                onClick={() => {
                                    setIsPollMenuOpen((prev) => !prev);
                                    setIsPoll((prev) => !prev);
                                    !isImage &&
                                        dispatch(setBlur(!isPollMenuOpen));
                                }}
                            />
                            <label
                                htmlFor="inputTag"
                                className="cursor-pointer"
                            >
                                <PhotoIcon className="h-6 w-6 text-[#565759] dark:text-college-dark-white-2 " />
                                <input
                                    id="inputTag"
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleChange}
                                    accept="image/jpg, image/png"
                                />
                            </label>
                        </div>
                        <input
                            ref={inputRef}
                            type="text"
                            value={messageText}
                            className="flex-1 bg-transparent outline-none resize-none font-secondary placeholder:text-college-dark-white-2 placeholder:dark:text-college-dark-white-2"
                            onChange={(e) => setMessageText(e.target.value)}
                            placeholder={title}
                        />
                        <FaceSmileIcon
                            className="w-6 h-6 cursor-pointer stroke-[#565759] dark:stroke-college-dark-white-2"
                            onClick={() => setIsEmojiPicker((prev) => !prev)}
                        />
                        <button type="submit">
                            <PaperAirplaneIcon className="w-6 h-6 stroke-[#565759] dark:stroke-college-dark-white-2" />
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default RoomLayout;
