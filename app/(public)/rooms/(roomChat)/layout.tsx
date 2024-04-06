"use client";
import React, { MutableRefObject, useRef, useState } from "react";

// icons
import { FaceSmileIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { ChartBarIcon, PhotoIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import axiosInstance from "@/app/utils/axios";
import { useParams } from "next/navigation";
import { socket } from "@/app/StoreProvider";
import {
    addMessage,
    updateLikeMessage,
    updateMessage,
} from "@/lib/slices/chatSlice";
import { v4 } from "uuid";
import EmojiPicker from "emoji-picker-react";
import { useTheme } from "next-themes";
import { Theme } from "emoji-picker-react";
import Dropdown from "@/app/components/Dropdown";
import PollMenu from "@/app/components/input-menus/PollMenu";
import ImageMenu from "@/app/components/input-menus/ImageMenu";
import { resetFileInput } from "@/app/utils/helper";
import { connectSocket } from "@/lib/slices/socketSlice";

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

    const [isPoll, setIsPoll] = useState(false);
    const [isImage, setIsImage] = useState(false);

    const [file, setFile] = useState<string | undefined>();
    const [fileData, setFileData] = useState<any>();

    const menuOptions = [
        {
            id: 1,
            name: "Poll",
            icon: (
                <ChartBarIcon className="h-6 w-6 text-college-dark-white-2" />
            ),
            action: () => {
                setIsPollMenuOpen((prev) => !prev);
            },
        },
        {
            id: 2,
            name: "Image",
            icon: <PhotoIcon className="h-6 w-6 text-college-dark-white-2 " />,
            action: () => {
                console.log("edit");
            },
        },
    ];

    const inputRef = React.useRef<any>(null);

    const fileInputRef = React.useRef<any>(null);
    const handleSendMessage = async (e: any) => {
        e?.preventDefault();
        setIsImage(false);
        setLoading(true);
        setFile(undefined);

        let message = {
            _id: v4(),
            roomId: roomId,
            text: messageText,
            messageType: isImage ? "Image" : "Text",
            profile: {
                _id: profile?._id,
                fName: profile.fName,
                lName: profile.lName,
                avatar: profile.avatar,
            },
            image: {
                url: file,
            },
            likesCount: 0,
            isLiked: false,
        };

        const index = messages.length;
        setMessageText("");
        try {
            await dispatch(addMessage(message));
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
            formData.append("messageType", file ? "Image" : "Text");
            formData.append("profileId", profile?._id);

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
                            // console.log(data);
                        });

                        socket.on("send-like-message", (data: any) => {
                            console.log(data, "like-message");
                            dispatch(updateLikeMessage(data));
                        });

                        socket.emit("open-room", {
                            roomId: roomId.toString(),
                            profileId: profile?._id,
                        });
                    });
                }

                socket.emit("send-message", {
                    ...message,
                    image: response.data.data.image,
                    _id: response.data.data._id,
                });
                dispatch(updateMessage({ index, message: response.data.data }));
                setLoading(false);
            }
        } catch (err: any) {
            console.log(err.response);
            if (err.response.status === 409) {
                // this means that the message send has a not ssafe for viewing image
                // so we need to delete the message
                console.log("This image is not safe for viewing");
                dispatch(
                    updateMessage({
                        index,
                        message: {
                            ...message,
                            text: "This image is not safe for viewing",
                            image: null,
                            messageType: "Text",
                        },
                    })
                );
                setLoading(false);
            }
            console.log(err);
            setLoading(false);
        }

        resetFileInput("inputTag");
    };

    function handleChange(e: any) {
        setIsImage(true);
        setFile(URL.createObjectURL(e.target.files[0]));
        setFileData(e.target.files[0]);
    }

    return (
        <>
            <div className="bg-[url('https://camo.githubusercontent.com/cba518ead87b032dc6f1cbfc7fade27604449201ac1baf34d889f77f093f01ac/68747470733a2f2f7765622e77686174736170702e636f6d2f696d672f62672d636861742d74696c652d6461726b5f61346265353132653731393562366237333364393131306234303866303735642e706e67')] bg-fixed bg-contain h-full w-full absolute top-0 left-0 invert-[15%] dark:invert-[80%]"></div>
            <div className="min-h-screen h-full relative w-full">
                {children}
                <div
                    className={`max-[700px]:bottom-20 bottom-4 sticky rounded-2xl flex flex-col mx-6`}
                >
                    {file && (
                        <ImageMenu
                            file={file}
                            closeFileMenu={() => {
                                setFile(undefined);
                                setFileData(undefined);
                                setIsImage(false);
                                resetFileInput("inputTag");
                            }}
                        />
                    )}
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
                        className="flex items-center gap-2 p-2.5 px-3 w-full bg-white rounded-xl border-[1px] border-stone-400 dark:border-college-dark-gray-3 dark:bg-college-dark-gray-3"
                    >
                        <div className="flex gap-1 items-center">
                            <ChartBarIcon
                                className="w-5 h-5 cursor-pointer text-[#565759] dark:text-college-dark-white-2"
                                onClick={() =>
                                    setIsPollMenuOpen((prev) => !prev)
                                }
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
                                    // accept=".jpg .png"
                                />
                            </label>
                        </div>
                        {isMenuOpen && (
                            <Dropdown
                                handleOptions={() => {}}
                                options={menuOptions}
                                className="absolute left-0 bottom-14 dark:bg-college-dark-gray-3"
                                onClick={() => setIsMenuOpen(false)}
                            />
                        )}
                        <input
                            ref={inputRef}
                            type="text"
                            value={messageText}
                            className="flex-1 bg-transparent outline-none resize-none font-secondary placeholder:text-college-dark-white-2 placeholder:dark:text-college-dark-white-2"
                            onChange={(e) => setMessageText(e.target.value)}
                            placeholder={`${
                                isImage
                                    ? "Add a caption"
                                    : isPoll
                                    ? "Ask a question"
                                    : "Type a message"
                            }`}
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
