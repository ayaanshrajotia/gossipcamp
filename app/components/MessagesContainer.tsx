"use client";
import { MessagesContainerProps } from "@/app/utils/definitions";
import { capitalizeFirstLetter } from "@/app/utils/helper";
import { AppDispatch, RootState } from "@/lib/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MessageBox from "./post-containers/MessageBox";
import { socket } from "../StoreProvider";
import {
    addMessage,
    deleteAndUpdateMessage,
    getAllMessages,
    updateLikeMessage,
    updatePollVote,
} from "@/lib/slices/chatSlice";
import { connectSocket } from "@/lib/slices/socketSlice";
import Skeleton from "react-loading-skeleton";
import { useTheme } from "next-themes";

var timer: any = null;
let prevheight = 0;

export default function MessagesContainer({ roomId }: MessagesContainerProps) {
    const { profile } = useSelector((state: RootState) => state.auth);
    const [pageNo, setPageNo] = useState(1);
    const dispatch = useDispatch<AppDispatch>();
    const { theme } = useTheme();

    let { messages, messageLoading, hasNextPage } = useSelector(
        (state: RootState) => state.chat
    );

    console.log(messages[messages.length - 1]);

    useEffect(() => {
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
            });

            socket.on("send-like-message", (data: any) => {
                dispatch(updateLikeMessage(data));
            });

            socket.on("send-delete-message", (data: any) => {
                dispatch(deleteAndUpdateMessage(data));
            });

            socket.on("send-poll-vote", (data: any) => {
                dispatch(updatePollVote(data));
            });
        });

        return () => {
            socket.off("message");
            socket.off("send-like-message");
            socket.off("send-delete-message");
        };
    }, [dispatch]);

    useEffect(() => {
        dispatch(getAllMessages({ roomId, page: pageNo })).then(() => {
            if (pageNo == 1) {
                window.scrollTo({
                    top: document.body.scrollHeight, // Scroll to the bottom
                });
            } else {
                setTimeout(() => {
                    window.scrollTo({
                        top: document.body.scrollHeight - prevheight, // Scroll to the bottom
                    });
                }, 1000);
            }
            timer = setTimeout(() => {
                clearTimeout(timer);
                timer = null;
            }, 3000);
        });
    }, [dispatch, roomId, pageNo]);

    useEffect(() => {
        const handleScroll: any = () => {
            if (
                !messageLoading &&
                timer === null &&
                hasNextPage &&
                window.scrollY - window.innerHeight < -800
            ) {
                setPageNo((oldPage) => {
                    return oldPage + 1;
                });

                prevheight = document.body.scrollHeight;

                timer = setTimeout(() => {
                    clearTimeout(timer);
                    timer = null;
                }, 2000);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [messageLoading]);

    return (
        <div className="message-box min-h-[calc(100vh-200px)] pb-4 w-full my-6 max-w-[1400px] mx-auto flex flex-col gap-8 z-[-1] px-6 font-secondary">
            {messageLoading && (
                <Skeleton
                    count={2}
                    width={200}
                    baseColor={theme === "dark" ? "#202020" : "#e0dfdf"}
                    highlightColor={theme === "dark" ? "#444" : "#f2f2f2"}
                />
            )}

            {pageNo === 1 && messageLoading ? (
                <div className="flex flex-col-reverse gap-4 h-full">
                    <div className="self-end">
                        <Skeleton
                            count={2}
                            width={200}
                            baseColor={theme === "dark" ? "#202020" : "#e0dfdf"}
                            highlightColor={
                                theme === "dark" ? "#444" : "#f2f2f2"
                            }
                        />
                    </div>
                    <Skeleton
                        count={2}
                        width={200}
                        baseColor={theme === "dark" ? "#202020" : "#e0dfdf"}
                        highlightColor={theme === "dark" ? "#444" : "#f2f2f2"}
                    />
                    <Skeleton
                        count={2}
                        width={200}
                        baseColor={theme === "dark" ? "#202020" : "#e0dfdf"}
                        highlightColor={theme === "dark" ? "#444" : "#f2f2f2"}
                    />
                    <div className="self-end">
                        <Skeleton
                            count={2}
                            width={200}
                            baseColor={theme === "dark" ? "#202020" : "#e0dfdf"}
                            highlightColor={
                                theme === "dark" ? "#444" : "#f2f2f2"
                            }
                        />
                    </div>
                    <div className="self-end">
                        <Skeleton
                            count={2}
                            width={200}
                            baseColor={theme === "dark" ? "#202020" : "#e0dfdf"}
                            highlightColor={
                                theme === "dark" ? "#444" : "#f2f2f2"
                            }
                        />
                    </div>
                    <Skeleton
                        count={2}
                        width={200}
                        baseColor={theme === "dark" ? "#202020" : "#e0dfdf"}
                        highlightColor={theme === "dark" ? "#444" : "#f2f2f2"}
                    />
                    <Skeleton
                        count={2}
                        width={200}
                        baseColor={theme === "dark" ? "#202020" : "#e0dfdf"}
                        highlightColor={theme === "dark" ? "#444" : "#f2f2f2"}
                    />
                    <div className="self-end">
                        <Skeleton
                            count={2}
                            width={200}
                            baseColor={theme === "dark" ? "#202020" : "#e0dfdf"}
                            highlightColor={
                                theme === "dark" ? "#444" : "#f2f2f2"
                            }
                        />
                    </div>
                    <Skeleton
                        count={2}
                        width={200}
                        baseColor={theme === "dark" ? "#202020" : "#e0dfdf"}
                        highlightColor={theme === "dark" ? "#444" : "#f2f2f2"}
                    />
                    <Skeleton
                        count={2}
                        width={200}
                        baseColor={theme === "dark" ? "#202020" : "#e0dfdf"}
                        highlightColor={theme === "dark" ? "#444" : "#f2f2f2"}
                    />
                    <div className="self-end">
                        <Skeleton
                            count={2}
                            width={200}
                            baseColor={theme === "dark" ? "#202020" : "#e0dfdf"}
                            highlightColor={
                                theme === "dark" ? "#444" : "#f2f2f2"
                            }
                        />
                    </div>
                </div>
            ) : (
                <>
                    {messages.length === 0 && (
                        <h1 className="font-bold text-xl font-secondary text-center">
                            No chats to show!
                        </h1>
                    )}
                    {messages.map((message: any) => {
                        return (
                            <MessageBox
                                key={message?._id}
                                id={message?._id}
                                isLiked={message?.isLiked}
                                messageType={message.messageType}
                                date={message.updatedAt}
                                profileUrl={message.profile?.avatar}
                                postImgUrl={message.image?.url}
                                pollOptions={message?.pollOptions}
                                isPollVoted={message?.isPollVoted}
                                user={
                                    capitalizeFirstLetter(
                                        message.profile?.fName
                                    ) +
                                    capitalizeFirstLetter(
                                        message.profile?.lName
                                    )
                                }
                                description={message.text}
                                likesCount={message.likesCount || 0}
                                isUser={message.profile?._id === profile?._id}
                                pollIndex={message?.pollIndex}
                            />
                        );
                    })}
                </>
            )}
        </div>
    );
}
