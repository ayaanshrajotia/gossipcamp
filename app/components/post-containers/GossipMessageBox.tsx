import Image from "next/image";
import { useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useTheme } from "next-themes";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { useParams } from "next/navigation";
import { socket } from "@/app/StoreProvider";
import toast from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";
import { useLongPress } from "@uidotdev/usehooks";
import { deleteAndUpdateGossipDiscussionMessage, deleteGossipDiscussionMessageApi } from "@/lib/slices/gossipDiscussionSlice";
import { GossipMessagePropsType } from "@/app/utils/definitions";
import Linkify from "linkify-react";

function GossipMessageBox({
    bgcolor = "bg-white",
    textColor,
    className = "",
    date,
    profileUrl,
    user,
    id,
    description,
    isUser,
    messageType,
    ...props
}: GossipMessagePropsType) {
    dayjs.extend(relativeTime); // use relative time plugin
    const { theme } = useTheme();
    const relativeDate = dayjs(date).fromNow();
    const dispatch = useDispatch<AppDispatch>();
    const roomId = useParams().roomId;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    // hook for long press
    const attrs = useLongPress(
        () => {
            setIsMenuOpen(true);
        },
        {
            onCancel: (event) => setIsMenuOpen(false),
            threshold: 200,
        }
    );

    const handleDelete = async () => {
        dispatch(deleteAndUpdateGossipDiscussionMessage({ gossipMessageId: id }));
        await dispatch(deleteGossipDiscussionMessageApi(id));
        toast.success("Message deleted successfully");
        socket.emit("delete-message", {
            roomId,
            messageId: id,
        });
    };


    return (
        <motion.div whileTap={{ scale: 0.98 }}>
            {/* Main message box */}
            <div
                {...attrs}
                className={`border-box relative max-w-[500px] w-fit flex flex-col border-[1px] border-stone-400 rounded-xl font-secondary ${textColor} ${className} bg-white px-3 py-3 pt-2 pb-2 dark:bg-college-dark-gray-3 dark:border-college-dark-gray-2 cursor-pointer ${
                    theme === "dark"
                        ? isUser
                            ? "ml-auto box-shadow-yellow-static-dark"
                            : "self-start box-shadow-static-dark"
                        : isUser
                        ? "ml-auto box-shadow-yellow-static"
                        : "self-start box-shadow-static"
                }`}
                style={{ color: textColor }}
                {...props}
            >
                {/* {isUser && (
                    <EllipsisVerticalIcon
                        className="w-5 h-5 absolute right-1.5 top-2 cursor-pointer"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    />
                    )} */}
                {/* Delete button */}
                <AnimatePresence>
                    {isUser &&
                        isMenuOpen &&
                        description !== "This message is deleted" && (
                            <motion.button
                                initial={{ x: 300, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: 800, opacity: 0 }}
                                key={"delete"}
                                className={`absolute right-2 top-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-medium transition-all`}
                                onClick={() => {
                                    setIsMenuOpen(false);
                                    handleDelete();
                                }}
                            >
                                DELETE
                            </motion.button>
                        )}
                </AnimatePresence>
                {/* Data of the message box */}
                <div className="flex gap-2.5 pr-[60px]">
                    <div>
                        <div className="relative h-[40px] w-[40px]">
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
                        {/* Username */}
                        <div className="flex justify-between items-center mr-8">
                            <h2 className="font-extrabold dark:text-college-dark-white">
                                @{user}
                            </h2>
                        </div>
                        {/* Description */}
                        <p className="leading-tight break-all text-[15px]">
                            <Linkify
                                options={{
                                    className:
                                        "text-blue-500 dark:text-blue-400 underline hover:text-blue-600",
                                }}
                            >
                                {description}
                            </Linkify>
                        </p>
                    </div>
                </div>
                <div className="flex items-end justify-end gap-1">
                    <span className="text-xs text-right mt-1 tracking-tight text-college-dark-white-2">
                        {relativeDate}
                    </span>
                </div>
            </div>
        </motion.div>
    );
}

export default GossipMessageBox;
