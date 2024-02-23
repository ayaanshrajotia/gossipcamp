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
            <div className="sticky top-0 bg-white dark:bg-slate-900 z-[999] flex items-center px-4 gap-4 border-b-1 h-[70px]">
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
                    <span className="font-secondary text-gray-500 text-sm">
                        @{roomId}
                    </span>
                </div>
            </div>
            <div className="w-full px-6 my-6 max-w-[1400px] mx-auto flex flex-col gap-8">
                <PostBox
                    className="box-shadow-black"
                    date="8 Jan"
                    profileUrl="/avatar-2.png"
                    user="Nightranger"
                    description="What do you guys think about this course on Web development by CollegeKhabar? Please vote in the poll."
                    postImgUrl="/thumbnail.jpg"
                    isUser={false}
                />
                <PostBox
                    className="box-shadow-black"
                    date="8 Jan"
                    profileUrl="/avatar-2.png"
                    user="Nightranger"
                    description="What do you guys think about this course on Web development by CollegeKhabar? Please vote in the poll."
                    postImgUrl="/thumbnail.jpg"
                    isUser={false}
                />
                <PostBox
                    className="box-shadow-black"
                    date="8 Jan"
                    profileUrl="/avatar-1.png"
                    user="DeathVader"
                    description="I know a guy who can help in hacking the instagram accounts"
                    isUser={true}
                />
                <PostBox
                    className="box-shadow-black"
                    date="8 Jan"
                    profileUrl="/avatar-1.png"
                    user="BurgerEater"
                    description="This app is so coooooool 🔥. Best social media app for College students."
                    isUser={false}
                />
                <PostBox
                    className="box-shadow-black"
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
