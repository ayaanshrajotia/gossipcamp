"use client";

import { RoomPropsType } from "@/app/utils/definitions";
import PostBox from "@/app/ui/post-containers/PostBox";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function Room() {
    const { roomId } = useParams();
    const roomName = "LNCT Bhopal";
    return (
        <>
            <div className="pt-4 sticky w-full top-0 bg-college-bg-grey z-[999]">
                <div className=" bg-neutral-700 border-1 text-white border-black dark:bg-slate-900  flex items-center gap-4 h-[70px] px-4 rounded-xl">
                    <div>
                        <div className="relative h-[45px] w-[45px]">
                            <Image
                                src="/lnct-logo.png"
                                alt="avatar-1"
                                fill
                                className="object-cover rounded-full border-1 border-black"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-secondary font-bold text-lg">
                            {roomId}
                        </span>
                        <span className="font-secondary text-gray-400 text-sm">
                            @{roomId}
                        </span>
                    </div>
                </div>
            </div>
            <div className="w-full my-6 mb-10 max-w-[1400px] mx-auto flex flex-col gap-8 z-[-1]">
                <PostBox
                    date="8 Jan"
                    profileUrl="/avatar-2.png"
                    user="Nightranger"
                    description="What do you guys think about this course on Web development by CollegeKhabar? Please vote in the poll."
                    postImgUrl="/thumbnail.jpg"
                    isUser={false}
                />
                <PostBox
                    date="8 Jan"
                    profileUrl="/avatar-2.png"
                    user="Nightranger"
                    description="What do you guys think about this course on Web development by CollegeKhabar? Please vote in the poll."
                    postImgUrl="/thumbnail.jpg"
                    isUser={false}
                />
                <PostBox
                    date="8 Jan"
                    profileUrl="/avatar-1.png"
                    user="DeathVader"
                    description="I know a guy who can help in hacking the instagram accounts"
                    isUser={true}
                />
                <PostBox
                    date="8 Jan"
                    profileUrl="/avatar-1.png"
                    user="BurgerEater"
                    description="This app is so coooooool 🔥. Best social media app for College students."
                    isUser={false}
                />
                <PostBox
                    date="8 Jan"
                    profileUrl="/avatar-1.png"
                    user="BurgerEater"
                    description="This app is so coooooool 🔥. Best social media app for College students."
                    isUser={true}
                />
                <PostBox
                    date="8 Jan"
                    profileUrl="/avatar-1.png"
                    user="DeathVader"
                    description="I know a guy who can help in hacking the instagram accounts"
                    isUser={true}
                />
                <PostBox
                    date="8 Jan"
                    profileUrl="/avatar-1.png"
                    user="BurgerEater"
                    description="This app is so coooooool 🔥. Best social media app for College students."
                    isUser={false}
                />
                <PostBox
                    date="8 Jan"
                    profileUrl="/avatar-1.png"
                    user="BurgerEater"
                    description="This app is so coooooool 🔥. Best social media app for College students."
                    isUser={true}
                />
            </div>
        </>
    );
}
