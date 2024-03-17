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
import {
    addMessage,
    getAllMessages,
    setLoadingFalse,
} from "@/lib/slices/chatSlice";
import { connectSocket } from "@/lib/slices/socketSlice";
import InfiniteScroll from "react-infinite-scroller";

export default function MessagesContainer({ roomId }: MessagesContainerProps) {
    const { user, profile } = useSelector((state: RootState) => state.auth);
    // const [messages, setMessages] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const dispatch = useDispatch<AppDispatch>();

    let { page, messages, messageLoading, hasNextPage } = useSelector(
        (state: RootState) => state.chat
    );

    let { isConnected = false } = useSelector(
        (state: RootState) => state.socket || {}
    );

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
    // };\

    useEffect(() => {
        if (!isConnected) {
            dispatch(connectSocket()).then(() => {
                socket.on("message", (data: any) => {
                    let f = async () => {
                        await dispatch(addMessage(data));
                        window.scrollTo({
                            top: document.body.scrollHeight, // Scroll to the bottom
                            behavior: "smooth",
                        });
                    };
                    f();
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
        dispatch(getAllMessages({ roomId, page: 1 })).then(() => {
            // setTimeout(() => {
            //     dispatch(setLoadingFalse(false));
            // }, 3000);
            window.scrollTo({
                top: document.body.scrollHeight, // Scroll to the bottom
                behavior: "smooth",
            });
        });
    }, [dispatch, roomId]);

    return (
        <div className="message-box min-h-[calc(100vh-200px)] pb-4 w-full my-6 max-w-[1400px] mx-auto flex flex-col-reverse gap-8 z-[-1] px-6">
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
                        isUser={message.profile._id === profile?._id}
                    />
                );
            })}
            </div>
    );
}

        // <InfiniteScroll
        //     pageStart={0}
        //     loadMore={async () => {
        //         if (hasNextPage && !messageLoading) {
        //             await dispatch(getAllMessages({ roomId, page: page + 1 }));
        //             setTimeout(() => {
        //                 dispatch(setLoadingFalse(false));
        //             }, 1000);
        //             window.scrollTo({
        //                 top: document.body.scrollHeight, // Scroll to the bottom
        //                 behavior: "smooth",
        //             });
        //         }
        //     }}
        //     className="message-box min-h-[calc(100vh-200px)] pb-4 w-full my-6 max-w-[1400px] mx-auto flex flex-col-reverse gap-8 z-[-1] px-6"
        //     hasMore={hasNextPage}
        //     isReverse={true}
        //     loader={
        //         <div className="loader" key={0}>
        //             Loading ...
        //         </div>
        //     }
        
            // {messages?.toReversed().map((message: any) => {
            //     return (
            //         <MessageBox
            //             key={message._id}
            //             messageType={message.messageType}
            //             date="8 Jan"
            //             profileUrl={message.profile.avatar}
            //             user={
            //                 capitalizeFirstLetter(message.profile.fName) +
            //                 capitalizeFirstLetter(message.profile.lName)
            //             }
            //             description={message.text}
            //             isUser={message.profile._id === profile._id}
            //         />
            //     );
            // })}
        // {/* </InfiniteScroll> */}
