"use client";

import React, { useEffect, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

// icons
import {
    PhotoIcon,
    PaperAirplaneIcon,
    VideoCameraIcon,
    CameraIcon,
} from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { sendMessageEmitter } from "@/lib/slices/socketSlice";
import axiosInstance from "@/app/utils/axios";
import { useParams } from "next/navigation";
import { socket } from "@/app/StoreProvider";
import { addMessage } from "@/lib/slices/chatSlice";

function RoomLayout({ children }: { children: React.ReactNode }) {
    const [isActive, setIsActive] = useState(false);
    const [file, setFile] = useState();
    const [messageText, setMessageText] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    let { roomId } = useParams();

    const { profile } = useSelector((state: RootState) => state.auth);

    const handleFocus = () => {
        setIsActive(true);
    };

    const handleBlur = () => {
        setIsActive(false);
    };

    function handleChange(e: any) {
        // console.log(e.target.files);
        // setFile(URL.createObjectURL(e.target.files[0]));
    }

    const handleSendMessage = async (e: any) => {
        e.preventDefault();
        console.log("message sent");
        // dispatch(sendMessageEmitter({ roomId: "123", message: messageText, profileId:  }))
        setLoading(true);
        try {
            const response = await axiosInstance.post(
                "messages/send-message/" + roomId,
                {
                    text: messageText,
                    messageType: "Text",
                    profileId: profile._id,
                }
            );

            if (response.status >= 200) {
                let message = {
                    _id: response.data.data._id,
                    roomId: roomId,
                    text: messageText,
                    messageType: "Text",
                    profile: {
                        _id: profile._id,
                        fName: profile.fName,
                        lName: profile.lName,
                        avatar: profile.avatar,
                    },
                };

                dispatch(addMessage(message));
                socket.emit("send-message", message);
                window.scrollTo({
                    top: document.body.scrollHeight, // Scroll to the bottom
                    behavior: "smooth",
                });
                setLoading(false);
            }
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
        setMessageText("");
    };

    return (
        <>
            <div className="bg-[url('https://camo.githubusercontent.com/cba518ead87b032dc6f1cbfc7fade27604449201ac1baf34d889f77f093f01ac/68747470733a2f2f7765622e77686174736170702e636f6d2f696d672f62672d636861742d74696c652d6461726b5f61346265353132653731393562366237333364393131306234303866303735642e706e67')] bg-fixed bg-contain h-full w-full absolute top-0 left-0 invert-[15%]"></div>
            <div className="min-h-screen h-full relative w-full">
                {children}
                <div
                    className={`bottom-4 sticky rounded-2xl transition-all duration-300 ease-in-out flex flex-col mx-6`}
                >
                    <form
                        onSubmit={handleSendMessage}
                        className="flex items-center gap-4 p-2.5 px-3 w-full bg-white rounded-xl border-1 border-stone-800"
                    >
                        {/* <div className="flex items-center gap-2">
                            <button>
                                <VideoCameraIcon className="w-7 h-7" />
                            </button>
                            <button>
                                <PhotoIcon className="w-7 h-7" />
                            </button>
                        </div> */}
                        {/* <TextareaAutosize
                            className="flex-1 bg-white outline-none resize-none font-secondary"
                            placeholder="Write your thoughts"
                            value={messageText}
                            onChange={(e) => setMessageText(e.target.value)}
                            // onFocus={handleFocus}
                            // onBlur={handleBlur}
                        /> */}
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
                    {/* <div className={`py-2 h-full ${isActive ? "" : "hidden"}`}>
                    <div className="border-2 border-dashed border-black rounded-lg  h-full w-full cursor-pointer bg-[#F1F2F5]">
                        <label
                            htmlFor="inputTag"
                            className="h-full w-full flex items-center justify-center cursor-pointer"
                        >
                            <CameraIcon className="h-16 w-16" />
                            <input
                                id="inputTag"
                                type="file"
                                onChange={handleChange}
                                // accept=".jpg .png"
                            />
                        </label>
                        <img src={file} />
                    </div>
                </div> */}
                </div>
            </div>
        </>
    );
}

export default RoomLayout;
