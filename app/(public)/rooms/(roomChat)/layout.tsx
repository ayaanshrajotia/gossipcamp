"use client";
import React, { useState } from "react";

// icons
import { FaceSmileIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import axiosInstance from "@/app/utils/axios";
import { useParams } from "next/navigation";
import { socket } from "@/app/StoreProvider";
import { addMessage } from "@/lib/slices/chatSlice";
import { v4 as uuidv4, v4 } from "uuid";
import EmojiPicker from "emoji-picker-react";

function RoomLayout({ children }: { children: React.ReactNode }) {
    const [messageText, setMessageText] = useState("");
    const [loading, setLoading] = useState(false);
    const [isEmojiPicker, setIsEmojiPicker] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const { profile } = useSelector((state: RootState) => state.auth);
    let { roomId } = useParams();

    const handleSendMessage = async (e: any) => {
        e.preventDefault();
        console.log("message sent");
        // dispatch(sendMessageEmitter({ roomId: "123", message: messageText, profileId:  }))
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
            };

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
                socket.emit("send-message", message);

                setLoading(false);
            }
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };

    console.log(messageText);

    return (
        <>
            <div className="bg-[url('https://camo.githubusercontent.com/cba518ead87b032dc6f1cbfc7fade27604449201ac1baf34d889f77f093f01ac/68747470733a2f2f7765622e77686174736170702e636f6d2f696d672f62672d636861742d74696c652d6461726b5f61346265353132653731393562366237333364393131306234303866303735642e706e67')] bg-fixed bg-contain h-full w-full absolute top-0 left-0 invert-[15%]"></div>
            <div className="min-h-screen h-full relative w-full">
                {children}
                <div
                    className={`bottom-4 sticky rounded-2xl transition-all duration-300 ease-in-out flex flex-col mx-6`}
                >
                    <EmojiPicker
                        open={isEmojiPicker}
                        width={400}
                        height={400}
                        // className="absolute top-0"
                        style={{ position: "absolute", bottom: "60px" }}
                        onEmojiClick={(e) =>
                            setMessageText(messageText + e.emoji)
                        }
                    />
                    <form
                        onSubmit={handleSendMessage}
                        className="flex items-center gap-4 p-2.5 px-3 w-full bg-white rounded-xl border-1 border-stone-800"
                    >
                        <FaceSmileIcon
                            className="w-6 h-6 cursor-pointer"
                            onClick={() => setIsEmojiPicker((prev) => !prev)}
                        />
                        <input
                            type="text"
                            value={messageText}
                            className="flex-1 bg-white outline-none resize-none font-secondary"
                            onChange={(e) => setMessageText(e.target.value)}
                        />
                        <button type="submit">
                            <PaperAirplaneIcon className="w-6 h-6 fill-white" />
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default RoomLayout;