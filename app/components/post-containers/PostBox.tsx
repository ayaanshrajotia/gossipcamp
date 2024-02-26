import { PostBoxPropsType } from "@/app/utils/definitions";
import Image from "next/image";

// icons
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/24/solid";

import { useState } from "react";

function PostBox({
    bgcolor = "bg-white",
    textColor,
    className = "",
    date,
    profileUrl,
    postImgUrl,
    user,
    description,
    isUser,
    ...props
}: PostBoxPropsType) {
    const [isLiked, setIsLiked] = useState(false);
    return (
        <div
            className={`border-box relative max-w-[450px] flex flex-col border-1 border-black rounded-xl font-secondary ${textColor} ${className} bg-white px-4 py-3 pb-2 ${
                isUser
                    ? "self-end box-shadow-yellow-static"
                    : "box-shadow-static"
            }`}
            style={{ color: textColor }}
            {...props}
        >
            {/* <div
                className={`post-heart absolute w-6 h-6 text-red-500  ${
                    isUser ? "-left-9" : "-right-10"
                } top-1/2 -translate-y-1/2`}
            >
                <HeartIcon />{" "}
            </div> */}
            <div className="flex gap-3">
                <div>
                    <div className="relative h-[50px] w-[50px]">
                        <Image
                            src={profileUrl}
                            alt="avatar-1"
                            fill
                            className="object-cover rounded-full"
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                        <h2 className="font-bold text-[17px]">@{user}</h2>
                        <div
                            className="bg-white text-black translate-y-[-100%]  text-xs py-1 px-3 rounded-full flex items-center gap-1 cursor-pointer border-1 border-red-500"
                            onClick={() => setIsLiked((prev) => !prev)}
                        >
                            {isLiked ? (
                                <HeartIconFilled className="h-4 w-4 text-red-500 cursor-pointer" />
                            ) : (
                                <HeartIcon className="h-4 w-4 text-red-500 cursor-pointer" />
                            )}
                            <span className="font-bold">100+</span>
                        </div>
                    </div>
                    <p className="leading-tight">{description}</p>
                    <>
                        {postImgUrl && (
                            <div className="relative w-full h-[200px] mt-3">
                                <Image
                                    src={postImgUrl!}
                                    alt="avatar-1"
                                    fill
                                    className="object-cover rounded-xl"
                                />
                            </div>
                        )}
                    </>
                </div>
            </div>
            <span className="text-xs text-right mt-1">{date}</span>
            {/* <div className="bg-stone-800 absolute bottom-0 right-14  text-white translate-y-[50%] text-xs py-1 px-3 rounded-full flex items-center gap-1">
                <span>❤️</span>
                <span>100+</span>
            </div> */}
        </div>
    );
}

export default PostBox;
