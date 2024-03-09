import PostBox from "@/app/components/post-containers/PostBox";
import { MessagesContainerProps } from "@/app/utils/definitions";
import { capitalizeFirstLetter } from "@/app/utils/helper";
import { getAllMessages } from "@/lib/slices/chatSlice";
import { AppDispatch, RootState } from "@/lib/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function MessagesContainer({ roomId }: MessagesContainerProps) {
    const { profile } = useSelector((state: RootState) => state.auth);
    const {
        fName: firstName,
        lName: lastName,
        avatar: imgUrl,
        _id: profileId,
    } = profile;
    const { page, messages } = useSelector((state: RootState) => state.chat);

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getAllMessages({ roomId, page: page + 1 }));
    }, [dispatch]);

    return (
        <div className="w-full my-6 mb-10 max-w-[1400px] mx-auto flex flex-col gap-8 z-[-1] px-6">
            {
                // messages.map((message: any) => {
                //     return (
                //         <PostBox
                //             date="8 Jan"
                //             profileUrl={imgUrl || "/images/avatar-1.png"}
                //             user={
                //                 capitalizeFirstLetter(firstName) +
                //                 capitalizeFirstLetter(lastName)
                //             }
                //             description={message.text}
                //             isUser={message.userId === profileId}
                //         />
                //     );
                // })
            }
            <PostBox
                className="box-shadow-black"
                date="8 Jan"
                profileUrl="/images/avatar-2.png"
                user="Nightranger"
                description="What do you guys think about this course on Web development by CollegeKhabar? Please vote in the poll."
                postImgUrl="/thumbnail.jpg"
                isUser={false}
            />
            <PostBox
                className="box-shadow-black"
                date="8 Jan"
                profileUrl="/images/avatar-2.png"
                user="Nightranger"
                description="What do you guys think about this course on Web development by CollegeKhabar? Please vote in the poll."
                postImgUrl="/thumbnail.jpg"
                isUser={false}
            />
            <PostBox
                className="box-shadow-black"
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
                className="box-shadow-black"
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
    );
}
