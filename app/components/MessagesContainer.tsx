"use client";

import { MessagesContainerProps } from "@/app/utils/definitions";
import { capitalizeFirstLetter } from "@/app/utils/helper";
import { AppDispatch, RootState } from "@/lib/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MessageBox from "./post-containers/MessageBox";
import { useParams } from "next/navigation";
import axiosInstance from "../utils/axios";
import { socket } from "../StoreProvider";
import { addMessage, getAllMessages } from "@/lib/slices/chatSlice";
import { connectSocket } from "@/lib/slices/socketSlice";

export default function MessagesContainer({ roomId }: MessagesContainerProps) {
    const { user, profile } = useSelector((state: RootState) => state.auth);
    // const [messages, setMessages] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const dispatch = useDispatch<AppDispatch>();

    let { page, messages, messageLoading, hasNextPage } = useSelector(
        (state: RootState) => state.chat
    );

    let { isConnected } = useSelector((state: RootState) => state.socket);

    // const getAllMessages = async () => {
    //     try {
    //         const response = await axiosInstance.get(
    //             `messages/${roomId}/all?page=${page + 1}`
    //         );
    //         console.log(response.data.data.docs);
    //         setMessages(response.data.data.docs);
    //         setPage(response.data.data.page);
    //         setHasMore(response.data.data.hasNextPage);
    //         setLoading(false);
    //     } catch (error) {
    //         setLoading(false);
    //         console.log(error);
    //     }
    // };
        
    useEffect(() => {
        if (!isConnected) {
            dispatch(connectSocket()).then(() => {
                socket.on("message", (data: any) => {
                    dispatch(addMessage(data));
                    console.log(data);
                });
            });
        } else {
            socket.on("message", (data: any) => {
                dispatch(addMessage(data));
                console.log(data);
            });
        }
    }, [dispatch]);

    useEffect(() => {
        // getAllMessages();
        dispatch(getAllMessages({ roomId, page: 1 }));
    }, []);

    return (
        <div className="min-h-[calc(100vh-200px)] w-full my-6 max-w-[1400px] mx-auto flex flex-col-reverse gap-8 z-[-1] px-6">
            {messages?.toReversed().map((message: any) => {
                return (
                    <MessageBox
                        key={message._id}
                        messageType={message.messageType}
                        date="8 Jan"
                        profileUrl={message.profile.avatar}
                        user={
                            capitalizeFirstLetter(message.profile.fName) +
                            capitalizeFirstLetter(message.profile.lName)
                        }
                        description={message.text}
                        isUser={message.profile._id === profile._id}
                    />
                );
            })}
            {/* <MessageBox
                messageType=""
                className="box-shadow-black"
                date="8 Jan"
                profileUrl="/images/avatar-2.png"
                user="Nightranger"
                description="What do you guys think about this course on Web development by CollegeKhabar? Please vote in the poll."
                postImgUrl="/thumbnail.jpg"
                isUser={false}
            /> */}
            {/* <PostBox
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
            /> */}
        </div>
    );
}
