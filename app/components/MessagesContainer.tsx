// "use client";
// import { MessagesContainerProps } from "@/app/utils/definitions";
// import { capitalizeFirstLetter } from "@/app/utils/helper";
// import { AppDispatch, RootState } from "@/lib/store";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import MessageBox from "./post-containers/MessageBox";
// import { socket } from "../StoreProvider";
// import { addMessage, getAllMessages } from "@/lib/slices/chatSlice";
// import { connectSocket } from "@/lib/slices/socketSlice";
// import InfiniteScroll from "react-infinite-scroll-component";

// var timer: any = null;

// export default function MessagesContainer({ roomId }: MessagesContainerProps) {
//     const { user, profile } = useSelector((state: RootState) => state.auth);
//     // const [messages, setMessages] = useState<any[]>([]);
//     const [loading, setLoading] = useState(false);
//     const [hasMore, setHasMore] = useState(true);
//     const [pageNo, setPageNo] = useState(1);
//     const dispatch = useDispatch<AppDispatch>();

//     let { page, messages, messageLoading, hasNextPage } = useSelector(
//         (state: RootState) => state.chat
//     );
//     console.log(messages);

//     let { isConnected = false } = useSelector(
//         (state: RootState) => state.socket || {}
//     );

//     useEffect(() => {
//         if (!isConnected) {
//             dispatch(connectSocket()).then(() => {
//                 socket.on("message", (data: any) => {
//                     let f = async () => {
//                         await dispatch(addMessage(data));
//                         window.scrollTo({
//                             top: document.body.scrollHeight, // Scroll to the bottom
//                             behavior: "smooth",
//                         });
//                     };
//                     f();
//                     console.log(data);
//                 });
//             });
//         } else {
//             socket.on("message", (data: any) => {
//                 dispatch(addMessage(data));

//                 console.log(data);
//             });
//         }
//     }, [dispatch, isConnected]);

//     useEffect(() => {
//         dispatch(getAllMessages({ roomId, page: pageNo })).then(() => {
//             if (pageNo == 1) {
//                 window.scrollTo({
//                     top: document.body.scrollHeight, // Scroll to the bottom
//                 });
//             }
//         });
//     }, [dispatch, roomId]);

//     const fetchMoreData = () => {
//         console.log("fetching more data ", pageNo);
//         setPageNo(pageNo + 1);
//         dispatch(getAllMessages({ roomId, page: pageNo }));
//     };

//     return (
//         <div className="min-h-[calc(100vh-200px)] h-full pb-4 w-full my-6 max-w-[1400px] mx-auto flex flex-col-reverse overflow-auto gap-8 z-[-1] px-6">
//             {/* {messageLoading && <h1>Loading..</h1>} */}
//             {/* {messages.map((message: any) => {
//                 return (
//                     <MessageBox
//                         key={message._id}
//                         messageType={message.messageType}
//                         date={message.updatedAt}
//                         profileUrl={message.profile.avatar}
//                         user={
//                             capitalizeFirstLetter(message.profile.fName) +
//                             capitalizeFirstLetter(message.profile.lName)
//                         }
//                         description={message.text}
//                         isUser={message.profile._id === profile?._id}
//                     />
//                 );
//             })} */}

//             <InfiniteScroll
//                 dataLength={messages.length}
//                 next={fetchMoreData}
//                 style={{ display: "flex", flexDirection: "column-reverse" }} //To put endMessage and loader to the top.
//                 inverse={true}
//                 className=" pb-4 w-full max-w-[1400px] mx-auto gap-8 z-[-1] px-6"
//                 hasMore={hasNextPage}
//                 loader={<h4>Loading...</h4>}
//                 endMessage={
//                     <p style={{ textAlign: "center" }}>
//                         <b>Yay! You have seen it all</b>
//                     </p>
//                 }
//             >
//                 {messages.toReversed().map((message: any) => (
//                     <MessageBox
//                         key={message._id}
//                         messageType={message.messageType}
//                         date={message.updatedAt}
//                         profileUrl={message.profile.avatar}
//                         user={
//                             capitalizeFirstLetter(message.profile.fName) +
//                             capitalizeFirstLetter(message.profile.lName)
//                         }
//                         description={message.text}
//                         isUser={message.profile._id === profile?._id}
//                     />
//                 ))}
//             </InfiniteScroll>
//         </div>
//     );
// }

"use client";
import { MessagesContainerProps } from "@/app/utils/definitions";
import { capitalizeFirstLetter } from "@/app/utils/helper";
import { AppDispatch, RootState } from "@/lib/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MessageBox from "./post-containers/MessageBox";
import { socket } from "../StoreProvider";
import { addMessage, getAllMessages } from "@/lib/slices/chatSlice";
import { connectSocket } from "@/lib/slices/socketSlice";
import { useParams, useRouter } from "next/navigation";

var timer: any = null;
let prevheight = 0;

export default function MessagesContainer({ roomId }: MessagesContainerProps) {
    const { user, profile } = useSelector((state: RootState) => state.auth);
    // const [messages, setMessages] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [pageNo, setPageNo] = useState(1);
    const dispatch = useDispatch<AppDispatch>();

    let { page, messages, messageLoading, hasNextPage } = useSelector(
        (state: RootState) => state.chat
    );

    let { isConnected = false } = useSelector(
        (state: RootState) => state.socket || {}
    );

    useEffect(() => {
        if (!isConnected) {
            dispatch(connectSocket()).then(() => {
                socket.on("message", (data: any) => {
                    let f = async () => {
                        dispatch(addMessage(data));
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
    }, [dispatch, isConnected]);

    useEffect(() => {
        console.log("fetching messages");
        if (hasNextPage && !messageLoading) {
            dispatch(getAllMessages({ roomId, page: pageNo })).then(() => {
                if (pageNo == 1) {
                    window.scrollTo({
                        top: document.body.scrollHeight, // Scroll to the bottom
                    });
                } else {
                    window.scrollTo({
                        top: document.body.scrollHeight - prevheight, // Scroll to the bottom
                    });
                }
                timer = setTimeout(() => {
                    setLoading(false);
                    clearTimeout(timer);
                    timer = null;
                }, 3000);
            });
        }
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
        <div className="message-box min-h-[calc(100vh-200px)] pb-4 w-full my-6 max-w-[1400px] mx-auto flex flex-col gap-8 z-[-1] px-6">
            {messageLoading && <h1>Loading..</h1>}
            {messages.map((message: any) => {
                return (
                    <MessageBox
                        key={message._id}
                        messageType={message.messageType}
                        date={message.updatedAt}
                        profileUrl={message.profile?.avatar}
                        user={
                            capitalizeFirstLetter(message.profile?.fName) +
                            capitalizeFirstLetter(message.profile?.lName)
                        }
                        description={message.text}
                        isUser={message.profile?._id === profile?._id}
                    />
                );
            })}
        </div>
    );
}
