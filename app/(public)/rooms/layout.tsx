"use client";

import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

// icons
import {
    PhotoIcon,
    PaperAirplaneIcon,
    VideoCameraIcon,
    CameraIcon,
} from "@heroicons/react/24/outline";

function RoomLayout({ children }: { children: React.ReactNode }) {
    const [isActive, setIsActive] = useState(false);
    const [file, setFile] = useState();

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

    return (
        <>
            <div className="bg-[url('https://camo.githubusercontent.com/cba518ead87b032dc6f1cbfc7fade27604449201ac1baf34d889f77f093f01ac/68747470733a2f2f7765622e77686174736170702e636f6d2f696d672f62672d636861742d74696c652d6461726b5f61346265353132653731393562366237333364393131306234303866303735642e706e67')] bg-fixed bg-contain h-full w-full absolute top-0 left-0 invert-[15%]"></div>
            <div className="min-h-screen relative w-full">
                {children}
                <div
                    className={`bottom-4 sticky rounded-2xl transition-all duration-300 ease-in-out flex flex-col mx-6`}
                >
                    <div className="flex items-center gap-4 p-2.5 px-3 w-full bg-white rounded-xl border-1 border-stone-800">
                        {/* <div className="flex items-center gap-2">
                            <button>
                                <VideoCameraIcon className="w-7 h-7" />
                            </button>
                            <button>
                                <PhotoIcon className="w-7 h-7" />
                            </button>
                        </div> */}
                        <TextareaAutosize
                            className="flex-1 bg-white outline-none resize-none font-secondary"
                            placeholder="Write your thoughts"
                            // onFocus={handleFocus}
                            // onBlur={handleBlur}
                        />
                        <button onClick={handleChange}>
                            <PaperAirplaneIcon className="w-6 h-6 fill-white" />
                        </button>
                    </div>
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
