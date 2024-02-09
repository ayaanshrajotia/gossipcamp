import { PostBoxPropsType } from "@/app/lib/definitions";
import Image from "next/image";

function PostBox({
    bgColor = "bg-white",
    textColor,
    className = "",
    date,
    profileUrl,
    postImgUrl,
    user,
    description,
    ...props
}: PostBoxPropsType) {
    console.log(postImgUrl);
    return (
        <div
            className={`relative max-w-[450px] flex flex-col border-1 border-black rounded-xl font-secondary ${textColor} ${className} bg-white px-4 py-3 pb-2 my-4`}
            style={{ color: textColor }}
            {...props}
        >
            <div className="flex gap-3">
                <div>
                    <div className="relative h-[50px] w-[50px]">
                        <Image
                            src={profileUrl}
                            alt="avatar-1"
                            fill
                            className="object-cover rounded-full border-1 border-black"
                        />
                    </div>
                </div>
                <div className="flex flex-col">
                    <h2 className="font-bold text-[17px]">@{user}</h2>
                    <p className="leading-tight">{description}</p>
                    <div className="">
                        {postImgUrl && (
                            <div className="relative w-full h-[200px] mt-3">
                                <Image
                                    src={postImgUrl!}
                                    alt="avatar-1"
                                    fill
                                    className="object-cover rounded-xl"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <span className="text-xs text-right mt-1">{date}</span>
        </div>
    );
}

export default PostBox;
