// icons
import { HeartIcon as HeartIconFilled } from "@heroicons/react/24/solid";
import {
    CheckIcon,
    HandThumbDownIcon,
    HandThumbUpIcon,
    HeartIcon,
} from "@heroicons/react/24/outline";

import Image from "next/image";
import { useState } from "react";
import { PollBoxPropsType } from "@/app/utils/definitions";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import ProgressBar from "@ramonak/react-progress-bar";
import { useTheme } from "next-themes";
import PeopleCount from "../PeopleCount";

function PollBox({
    isSend,
    bgcolor = "bg-white",
    textColor,
    className = "",
    date,
    profileUrl,
    postImgUrl,
    user,
    description,
    isUser,
    messageType,
    ...props
}: PollBoxPropsType) {
    dayjs.extend(relativeTime); // use relative time plugin
    const relativeDate = dayjs(date).fromNow();
    const [vote, setVote] = useState(5);

    const [isLiked, setIsLiked] = useState(false);
    const { theme } = useTheme();
    return (
        <div className="relative w-[450px] flex flex-col gap-4">
            <div
                className={`flex w-full flex-col border-1 rounded-xl font-secondary ${textColor} ${className} bg-white px-4 py-3 pt-4 pb-2 dark:bg-college-dark-gray-1 ${
                    theme === "dark"
                        ? isUser
                            ? "self-end box-shadow-yellow-static-dark"
                            : "self-start box-shadow-static-dark"
                        : isUser
                        ? "self-end box-shadow-yellow-static"
                        : "self-start box-shadow-static"
                }`}
                style={{ color: textColor }}
                {...props}
            >
                <div
                    className="absolute right-4 top-0 -translate-y-1/2 bg-white text-black text-xs py-0.5 px-3 rounded-full flex items-center gap-1 cursor-pointer border-1 border-red-500"
                    onClick={() => setIsLiked((prev) => !prev)}
                >
                    {isLiked ? (
                        <HeartIconFilled className="h-4 w-4 text-red-500 cursor-pointer" />
                    ) : (
                        <HeartIcon className="h-4 w-4 text-red-500 cursor-pointer" />
                    )}
                    <span className="font-bold">100+</span>
                </div>
                <div className="flex gap-3">
                    <div>
                        <div className="relative h-[50px] w-[50px]">
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
                        <div className="flex justify-between items-center">
                            <h2 className="font-extrabold dark:text-college-dark-white">
                                @{user}
                            </h2>
                        </div>
                        <p className="leading-tight">{description}</p>
                        <>
                            {postImgUrl && (
                                <div className="relative w-full h-[200px] mt-3">
                                    <Image
                                        src={postImgUrl!}
                                        alt="avatar-1"
                                        sizes="33vw"
                                        fill
                                        className="object-cover rounded-xl"
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
                    {isUser && (
                        <CheckIcon className="w-3 h-3 text-college-dark-white-2 mb-[2px]" />
                    )}
                </div>
            </div>
            <div
                className={`bg-white rounded-xl border-1 w-full px-4 py-3 flex flex-col gap-4 ${
                    theme === "dark"
                        ? isUser
                            ? "self-end box-shadow-yellow-static-dark"
                            : "self-start box-shadow-static-dark"
                        : isUser
                        ? "self-end box-shadow-yellow-static"
                        : "self-start box-shadow-static"
                }`}
            >
                <div className="flex flex-col gap-2">
                    <ProgressBar
                        completed={vote}
                        maxCompleted={10}
                        bgColor="#fdd800"
                        baseBgColor="#e6e9ea"
                        height="12px"
                        labelSize="10px"
                        isLabelVisible={false}
                        transitionDuration="0.3s"
                        animateOnRender
                    />
                    <div className="flex justify-between">
                        <HandThumbDownIcon
                            className="w-6 h-6 cursor-pointer"
                            onClick={() => setVote(vote - 1)}
                        />
                        <HandThumbUpIcon
                            className="w-6 h-6 cursor-pointer"
                            onClick={() => setVote(vote + 1)}
                        />
                    </div>
                </div>
                <PeopleCount
                    width="w-[35px]"
                    height="h-[35px]"
                    margin="-ml-5"
                    className="self-end"
                />
            </div>
        </div>
    );
}

export default PollBox;
