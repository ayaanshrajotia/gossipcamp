"use client";

import { RoomPropsType } from "@/app/utils/definitions";
import PostBox from "@/app/components/post-containers/PostBox";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { capitalizeFirstLetter } from "@/app/utils/helper";

export default function Room() {
    const { roomId } = useParams();
    const roomName = "LNCT Bhopal";
    const [isLiked, setIsLiked] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const { fName, lName, avatar } = useSelector(
        (state: RootState) => state.user.profile || ""
    );
    useLayoutEffect(() => {
        setFirstName(fName);
        setLastName(lName);
        setImgUrl(avatar);
    }, [fName, lName, avatar]);
    return (
        <>
            <div className="pt-4 sticky w-full top-0 z-[999]">
                <div className="bg-stone-800 text-white flex items-center gap-4 h-[70px] px-4 rounded-xl mx-6">
                    <div>
                        <div className="relative h-[45px] w-[45px]">
                            <Image
                                src="/images/lnct-logo.png"
                                alt="avatar-1"
                                fill
                                className="object-cover rounded-full"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-secondary font-extrabold text-lg">
                            {roomName}
                        </span>
                        <span className="font-secondary text-gray-400 text-sm">
                            @{roomId}
                        </span>
                    </div>
                </div>
            </div>
            <div className="w-full my-6 mb-10 max-w-[1400px] mx-auto flex flex-col gap-8 z-[-1] px-6">
                <PostBox
                    date="8 Jan"
                    profileUrl="/images/avatar-2.png"
                    user="Nightranger"
                    description="What do you guys think about this course on Web development by CollegeKhabar? Please vote in the poll."
                    postImgUrl="/thumbnail.jpg"
                    isUser={false}
                />
                <PostBox
                    date="8 Jan"
                    profileUrl="/images/avatar-2.png"
                    user="Nightranger"
                    description="What do you guys think about this course on Web development by CollegeKhabar? Please vote in the poll."
                    postImgUrl="/thumbnail.jpg"
                    isUser={false}
                />
                <PostBox
                    date="8 Jan"
                    profileUrl={imgUrl || "/images/avatar-1.png"}
                    user={
                        capitalizeFirstLetter(firstName) +
                        capitalizeFirstLetter(lastName)
                    }
                    description="I know a guy who can help in hacking the instagram accounts"
                    isUser={true}
                />
                <PostBox
                    date="8 Jan"
                    profileUrl="/images/avatar-1.png"
                    user="BurgerEater"
                    description="This app is so coooooool 🔥. Best social media app for College students."
                    isUser={false}
                />
                <PostBox
                    date="8 Jan"
                    profileUrl={imgUrl || "/images/avatar-1.png"}
                    user={
                        capitalizeFirstLetter(firstName) +
                        capitalizeFirstLetter(lastName)
                    }
                    description="This app is so coooooool 🔥. Best social media app for College students."
                    isUser={true}
                />
                <PostBox
                    date="8 Jan"
                    profileUrl={imgUrl || "/images/avatar-1.png"}
                    user={
                        capitalizeFirstLetter(firstName) +
                        capitalizeFirstLetter(lastName)
                    }
                    description="I know a guy who can help in hacking the instagram accounts"
                    isUser={true}
                />
                <PostBox
                    date="8 Jan"
                    profileUrl="/images/avatar-1.png"
                    user="BurgerEater"
                    description="This app is so coooooool 🔥. Best social media app for College students."
                    isUser={false}
                />
                <PostBox
                    date="8 Jan"
                    profileUrl={imgUrl || "/images/avatar-1.png"}
                    user={
                        capitalizeFirstLetter(firstName) +
                        capitalizeFirstLetter(lastName)
                    }
                    description="This app is so coooooool 🔥. Best social media app for College students."
                    isUser={true}
                />
            </div>
        </>
    );
}
