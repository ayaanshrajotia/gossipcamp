"use client";
import React, { useState } from "react";

// icons
import {
    FaceSmileIcon,
    PaperAirplaneIcon,
    PlusCircleIcon,
    PlusIcon,
} from "@heroicons/react/24/outline";
import { ChartBarIcon, PhotoIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import axiosInstance from "@/app/utils/axios";
import { useParams } from "next/navigation";
import { socket } from "@/app/StoreProvider";
import { addMessage, updateMessage } from "@/lib/slices/chatSlice";
import { v4 as uuidv4, v4 } from "uuid";
import EmojiPicker from "emoji-picker-react";
import { useTheme } from "next-themes";
import { Theme } from "emoji-picker-react";
import Dropdown from "@/app/components/Dropdown";
import PollMenu from "@/app/components/PollMenu";

function RoomLayout({ children }: { children: React.ReactNode }) {
    const [messageText, setMessageText] = useState("");
    const [loading, setLoading] = useState(false);
    const [isEmojiPicker, setIsEmojiPicker] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const { profile } = useSelector((state: RootState) => state.auth);
    const { messages } = useSelector((state: RootState) => state.chat);
    let { roomId } = useParams();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { theme } = useTheme();
    const [isPollMenuOpen, setIsPollMenuOpen] = useState(false);

    const menuOptions = [
        {
            id: 1,
            name: "Poll",
            icon: <ChartBarIcon className="h-6 w-6" />,
            action: () => {
                setIsPollMenuOpen((prev) => !prev);
            },
        },
        {
            id: 2,
            name: "Image",
            icon: <PhotoIcon className="h-6 w-6" />,
            action: () => {
                console.log("edit");
            },
        },
    ];

    const inputRef = React.useRef<HTMLInputElement>(null);
    const handleSendMessage = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        try {
            let message = {
                _id: v4(),
                roomId: roomId,
                text: messageText,
                messageType: "Text",
                profile: {
                    _id: profile?._id,
                    fName: profile.fName,
                    lName: profile.lName,
                    avatar: profile.avatar,
                },
                likesCount: 0,
                isLiked: false,
            };

            const index = messages.length;
            await dispatch(addMessage(message));
            setMessageText("");
            setIsEmojiPicker(false);

            window.scrollTo({
                top: document.body.scrollHeight, // Scroll to the bottom
                behavior: "smooth",
            });
            const response = await axiosInstance.post(
                "messages/send-message/" + roomId,
                {
                    text: messageText,
                    messageType: "Text",
                    profileId: profile?._id,
                }
            );

            if (response.status >= 200) {
                socket.emit("send-message", {
                    ...message,
                    _id: response.data.data._id,
                });
                dispatch(updateMessage({ index, message: response.data.data }));
                setLoading(false);
            }
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };

    return (
        <>
            <div className="bg-[url('https://camo.githubusercontent.com/cba518ead87b032dc6f1cbfc7fade27604449201ac1baf34d889f77f093f01ac/68747470733a2f2f7765622e77686174736170702e636f6d2f696d672f62672d636861742d74696c652d6461726b5f61346265353132653731393562366237333364393131306234303866303735642e706e67')] bg-fixed bg-contain h-full w-full absolute top-0 left-0 invert-[15%] dark:invert-[80%]"></div>
            <div className="min-h-screen h-full relative w-full">
                {children}
                <div
                    className={`max-[700px]:bottom-20 bottom-4 sticky rounded-2xl transition-all duration-300 ease-in-out flex flex-col mx-6`}
                >
                    <EmojiPicker
                        open={isEmojiPicker}
                        width={400}
                        height={400}
                        theme={theme as Theme}
                        // className="absolute top-0"
                        style={{ position: "absolute", bottom: "60px" }}
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
                    {isPollMenuOpen && (
                        <PollMenu
                            closePollMenu={() => setIsPollMenuOpen(false)}
                        />
                    )}
                    <form
                        onSubmit={handleSendMessage}
                        className="flex items-center gap-2 p-2.5 px-3 w-full bg-white rounded-xl border-[1px] dark:border-college-dark-gray-3 dark:bg-college-dark-gray-3"
                    >
                        <FaceSmileIcon
                            className="w-6 h-6 cursor-pointer stroke-[#565759] dark:stroke-college-dark-white-2"
                            onClick={() => setIsEmojiPicker((prev) => !prev)}
                        />
                        <PlusIcon
                            className="w-6 h-6 fill-white cursor-pointer stroke-[#565759] dark:stroke-college-dark-white-2"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        />
                        {isMenuOpen && (
                            <Dropdown
                                handleOptions={() => {}}
                                options={menuOptions}
                                className="absolute left-0 bottom-14"
                                onClick={() => setIsMenuOpen(false)}
                            />
                        )}
                        <input
                            ref={inputRef}
                            type="text"
                            value={messageText}
                            className="flex-1 bg-transparent outline-none resize-none font-secondary"
                            onChange={(e) => setMessageText(e.target.value)}
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
