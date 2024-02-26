import { PostBoxPropsType } from "@/app/utils/definitions";
import Image from "next/image";

function PostBox({
    bgcolor = "bg-white",
    textColor,
    className = "",
    date,
    profileUrl,
    postimgurl,
    user,
    description,
    ...props
}: PostBoxPropsType) {
    return (
        <div
            className={`relative w-[450px] flex flex-col border-1 border-black rounded-xl font-secondary ${textColor} ${className} bg-white px-4 py-3 pb-2 my-6`}
            style={{ color: textColor }}
            {...props}
        >
            <div className="flex gap-3">
                <div>
                    <div className="relative h-[50px] w-[50px]">
                        <Image
                            src={postimgurl}
                            alt="avatar-1"
                            fill
                            className="object-cover rounded-full border-1 border-black"
                        />
                    </div>
                </div>
                <div className="flex flex-col">
                    <h2 className="font-bold text-[17px]">@{user}</h2>
                    <p className="leading-tight">{description}</p>
                    <div>
                        <div className="relative h-[50px] w-[50px]">
                            <Image
                                src={profileUrl}
                                alt="avatar-1"
                                fill
                                className="object-cover rounded-full border-1 border-black"
                            />
                        </div>
                        {/* <div className="relative h-[100px] w-[100px]">
                            <Image
                                src={postimgurl}
                                alt="thumbnail"
                                fill
                                className="object-cover rounded-full border-1 border-black"
                            />
                        </div> */}
                    </div>
                </div>
            </div>
            <span className="text-xs text-right mt-1">{date}</span>
        </div>
    );
}

export default PostBox;
