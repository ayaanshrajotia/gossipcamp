"use client";

import React, { useState } from "react";

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
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }
    return (
        <div className="relative bg-[#F1F2F5] w-full">
            {children}
            <div
                className={`bg-white w-full  ${
                    !isActive ? "bottom-0 h-[60px]" : "bottom-0 h-[500px]"
                }  sticky  rounded-t-2xl border-1 border-black transition-all duration-300 ease-in-out flex flex-col px-3 pt-2`}
            >
                <div className="flex items-center gap-4 w-full h-fit">
                    <div className="flex items-center gap-2">
                        <button>
                            <VideoCameraIcon className="w-7 h-7" />
                        </button>
                        <button>
                            <PhotoIcon className="w-7 h-7" />
                        </button>
                    </div>
                    <input
                        className="flex-1 p-2 px-4 bg-[#F1F2F5] border-black rounded-full outline-none "
                        placeholder="Write your thoughts"
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    />
                    <button>
                        <PaperAirplaneIcon className="w-7 h-7" />
                    </button>
                </div>
                <div className={`py-2 h-full ${isActive ? "" : "hidden"}`}>
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
                </div>
            </div>
        </div>
    );
}

export default RoomLayout;
