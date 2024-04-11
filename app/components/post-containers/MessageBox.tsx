import { MessagesBoxPropsType } from "@/app/utils/definitions";
import JoinLeaveBox from "./JoinLeaveBox";
import PollBox from "./PollBox";
import TextImageBox from "./TextImageBox";

function MessageBox({
    bgcolor,
    textColor,
    className = "",
    date,
    profileUrl,
    postImgUrl,
    user,
    description,
    isUser,
    likesCount,
    id,
    pollOptions,
    isPollVoted,
    isLiked,
    messageType,
    ...props
}: MessagesBoxPropsType) {
    if (messageType === "Join Room" || messageType === "Leave Room") {
        return (
            <JoinLeaveBox
                bgcolor={bgcolor}
                textColor={textColor}
                className={className}
                date={date}
                profileUrl={profileUrl}
                postImgUrl={postImgUrl}
                user={user}
                description={description}
                isUser={isUser}
                messageType={messageType}
                {...props}
            />
        );
    } else if (messageType === "Poll" || messageType === "ImagePoll") {
        return (
            <PollBox
                bgcolor={bgcolor}
                textColor={textColor}
                className={className}
                date={date}
                profileUrl={profileUrl}
                postImgUrl={postImgUrl}
                pollOptions={pollOptions}
                isPollVoted={isPollVoted}
                user={user}
                id={id}
                description={description}
                isUser={isUser}
                messageType={messageType}
                {...props}
            />
        );
    } else  {
        return (
            <TextImageBox
                bgcolor={bgcolor}
                id={id}
                textColor={textColor}
                className={className}
                date={date}
                profileUrl={profileUrl}
                isLiked={isLiked}
                postImgUrl={postImgUrl}
                user={user}
                description={description}
                isUser={isUser}
                likesCount={likesCount}
                messageType={messageType}
                {...props}
            />
        );
    }
}

export default MessageBox;

// export default function MessageBox({
//     bgcolor,
//     textColor,
//     className = "",
//     date,
//     profileUrl,
//     postImgUrl,
//     user,
//     description,
//     isUser,
//     likesCount,
//     id,
//     pollOptions,
//     isPollVoted,
//     isLiked,
//     messageType,
//     ...props
// }: MessagesBoxPropsType) {
//     dayjs.extend(relativeTime); // use relative time plugin
//     const relativeDate = dayjs(date).fromNow();
//     // const { likesLoading } = useSelector((state: RootState) => state.chat);
//     const [likesLoading, setLikesLoading] = useState(false);
//     const dispatch = useDispatch<AppDispatch>();
//     const [liked, setLiked] = useState(isLiked);

//     const roomId = useParams().roomId;
//     const [isMenuOpen, setIsMenuOpen] = useState(false);

//     // need to use debouncing for like message
//     const menuOptions = [
//         {
//             name: "Delete",
//             action: async () => {
//                 dispatch(deleteAndUpdateMessage({ messageId: id }));
//                 await dispatch(deleteMessageApi(id));
//                 toast.success("Message deleted successfully");
//                 socket.emit("delete-message", {
//                     roomId,
//                     messageId: id,
//                 });
//             },
//         },
//     ];

//     const likeMessageHandlerDebounced = useDebouncedCallback(async () => {
//         setLikesLoading(true);
//         if (liked == isLiked) return;
//         await dispatch(toggleLikeMessage({ id, isLiked: !isLiked }));
//         // connect statement
//         setLikesLoading(false);
//         socket.emit("like-message", {
//             roomId,
//             messageId: id,
//             isLiked: !isLiked,
//         });
//     }, 1500);

//     let totalVotes = pollOptions?.reduce(
//         (acc: number, option: any) => acc + option.votes,
//         0
//     );

//     const likeClickHandler = () => {
//         setLiked((prev) => !prev);
//         dispatch(updateLikeMessage({ messageId: id, isLiked: !liked }));
//         likeMessageHandlerDebounced();
//     };

//     console.log(pollOptions);

//     const { theme } = useTheme();
//     return (
//         <>
//             <div
//                 className={`border-box relative min-w-[300px] flex flex-col border-[1px] border-stone-400 rounded-xl font-secondary ${textColor} ${className} bg-white px-4 py-3 pt-4 pb-2 dark:bg-college-dark-gray-3 dark:border-college-dark-gray-2 ${
//                     theme === "dark"
//                         ? isUser
//                             ? "self-end box-shadow-yellow-static-dark"
//                             : "self-start box-shadow-static-dark"
//                         : isUser
//                         ? "self-end box-shadow-yellow-static"
//                         : "self-start box-shadow-static"
//                 }`}
//                 style={{ color: textColor }}
//                 {...props}
//             >
//                 {isUser && (
//                     <EllipsisVerticalIcon
//                         className="w-5 h-5 absolute right-1.5 top-2 cursor-pointer"
//                         onClick={() => setIsMenuOpen(!isMenuOpen)}
//                     />
//                 )}

//                 {isUser && isMenuOpen && (
//                     <Dropdown
//                         handleOptions={() => {}}
//                         options={menuOptions}
//                         className="absolute -right-4 top-7"
//                         onClick={() => setIsMenuOpen(false)}
//                     />
//                 )}

//                 <div
//                     className="absolute left-4 bottom-0 translate-y-4 bg-white text-black text-xs py-0.5 px-1.5 rounded-2xl flex items-center gap-1 cursor-pointer border-[1px] border-stone-400 dark:bg-college-dark-gray-3 dark:border-college-dark-gray-2 dark:text-college-dark-white"
//                     onClick={likeClickHandler}
//                 >
//                     <motion.div
//                         whileHover={{ scale: 1.1 }}
//                         whileTap={{ scale: 0.8 }}
//                         key={"like"}
//                     >
//                         <HeartIcon
//                             className={`h-[18px] w-[18px] text-red-500 cursor-pointer ${
//                                 liked ? "fill-red-500" : "fill-transparent"
//                             }`}
//                         />
//                     </motion.div>
//                     {likesCount > 0 && <span className="">{likesCount}</span>}
//                 </div>
//                 <div className="flex gap-3 mb-2">
//                     <div>
//                         <div className="relative h-[50px] w-[50px]">
//                             <Image
//                                 src={profileUrl}
//                                 sizes="33vw"
//                                 alt="avatar-1"
//                                 fill
//                                 className="object-cover rounded-full"
//                             />
//                         </div>
//                     </div>
//                     <div className="flex flex-col">
//                         <div className="flex justify-between items-center">
//                             <h2 className="font-extrabold dark:text-college-dark-white">
//                                 @{user}
//                             </h2>
//                         </div>
//                         <p className="leading-tight text-base">{description}</p>
//                         <>
//                             {postImgUrl && (
//                                 <div className="relative h-[350px] mt-3">
//                                     <Image
//                                         src={postImgUrl!}
//                                         alt="avatar-1"
//                                         width={0}
//                                         height={0}
//                                         sizes="33vw"
//                                         className=" rounded-xl"
//                                         style={{
//                                             width: "auto",
//                                             height: "100%",
//                                         }}
//                                     />
//                                 </div>
//                             )}
//                         </>
//                     </div>
//                 </div>
//                 <div className="flex items-end justify-end gap-1">
//                     <span className="text-xs text-right mt-1 tracking-tight text-college-dark-white-2">
//                         {relativeDate}
//                     </span>
//                 </div>
//             </div>
//             <div
//                 className={`relative bg-white rounded-xl border-[1px] border-stone-400 w-full px-4 py-3 flex flex-col gap-4 dark:text-college-dark-white dark:bg-college-dark-gray-3 dark:border-college-dark-gray-2 ${
//                     theme === "dark"
//                         ? isUser
//                             ? "box-shadow-yellow-static-dark"
//                             : "box-shadow-static-dark"
//                         : isUser
//                         ? "box-shadow-yellow-static"
//                         : "box-shadow-static"
//                 }`}
//             >
//                 <div
//                     className="absolute left-4 bottom-0 translate-y-4 bg-white text-black text-xs py-0.5 px-1.5 rounded-2xl flex items-center gap-1 cursor-pointer border-[1px] border-stone-400 dark:bg-college-dark-gray-3 dark:border-college-dark-gray-2 dark:text-college-dark-white"
//                     onClick={likeClickHandler}
//                 >
//                     <motion.div
//                         whileHover={{ scale: 1.1 }}
//                         whileTap={{ scale: 0.8 }}
//                         key={"like"}
//                     >
//                         <HeartIcon
//                             className={`h-[18px] w-[18px] text-red-500 cursor-pointer ${
//                                 liked ? "fill-red-500" : "fill-transparent"
//                             }`}
//                         />
//                     </motion.div>
//                     {likesCount > 0 && <span className="">{likesCount}</span>}
//                 </div>
//                 <div className="flex flex-col gap-6">
//                     {pollOptions?.map((option: any) => (
//                         <div className="flex items-center gap-4" key={v4()}>
//                             <label
//                                 className="relative flex items-center rounded-full cursor-pointer mt-1"
//                                 htmlFor={option?.name}
//                             >
//                                 <input
//                                     type="checkbox"
//                                     className="before:content[''] peer relative h-7 w-7 cursor-pointer appearance-none rounded-full border border-stone-400 border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-none checked:bg-[#fdd800] checked:before:bg-[#fdd800] dark:checked:bg-[#837001] dark:checked:before:bg-[#837001] hover:before:opacity-10"
//                                     id={option?.name}
//                                     value={option?.name}
//                                     name={option?.name}
//                                 />
//                                 <span className="absolute text-college-dark-gray-2 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
//                                     <svg
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         className="h-3.5 w-3.5"
//                                         viewBox="0 0 20 20"
//                                         fill="currentColor"
//                                         stroke="currentColor"
//                                         strokeWidth="1"
//                                     >
//                                         <path
//                                             fillRule="evenodd"
//                                             d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                                             clipRule="evenodd"
//                                         ></path>
//                                     </svg>
//                                 </span>
//                             </label>
//                             <label
//                                 className="font-light cursor-pointer select-none w-full"
//                                 htmlFor={option?.name}
//                             >
//                                 <div className="flex justify-between">

//                                 </div>
//                                 <ProgressBar
//                                     completed={option?.votes}
//                                     maxCompleted={totalVotes}
//                                     bgColor={
//                                         theme === "dark" ? "#837001" : "#fdd800"
//                                     }
//                                     baseBgColor={
//                                         theme === "dark" ? "#3c3c3c" : "#e6e9ea"
//                                     }
//                                     height="10px"
//                                     labelSize="10px"
//                                     isLabelVisible={false}
//                                     transitionDuration="0.3s"
//                                     animateOnRender
//                                     className="w-full"
//                                 />
//                             </label>
//                         </div>
//                     ))}
//                 </div>
//                 <PeopleCount
//                     width="w-[35px]"
//                     height="h-[35px]"
//                     margin="-ml-5"
//                     className="self-end"
//                 />
//             </div>
//         </>
//     );
// }
