import Image from "next/image";
import Navbar from "../ui/Navbar";
import Sidebar from "../ui/Sidebar";
import PostBox from "../ui/post-containers/PostBox";

export default function Home() {
    return (
        <div className="h-screen relative">
            <div className="flex">
                <Navbar />
                <div className="relative flex flex-1 flex-col  bg-[#F1F2F5] ml-[220px] mr-[340px]">
                    <div className="sticky top-0 bg-white z-[999] flex items-center px-4 gap-4 border-b-1 h-[70px]">
                        <div>
                            <div className="relative h-[45px] w-[45px]">
                                <Image
                                    src="/lnct-logo.png"
                                    alt="avatar-1"
                                    fill
                                    className="object-cover rounded-full border-1 border-black"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-secondary font-bold text-lg">
                                LNCT Bhopal
                            </span>
                            <span className="font-secondary text-gray-500 text-sm">
                                Lakshmi Narain College of Technology, Bhopal
                            </span>
                        </div>
                    </div>
                    <div className="w-full px-8 mt-4 max-w-[1400px] mx-auto">
                        <PostBox
                            className="box-shadow-black"
                            date="8 Jan"
                            profileUrl="/avatar-2.png"
                            user="Nightranger"
                            description="What do you guys think about this course on Web development by CollegeKhabar? Please vote in the poll."
                            postImgUrl="/thumbnail.jpg"
                        />
                        <PostBox
                            className="box-shadow-black"
                            date="8 Jan"
                            profileUrl="/avatar-2.png"
                            user="Nightranger"
                            description="What do you guys think about this course on Web development by CollegeKhabar? Please vote in the poll."
                            postImgUrl="/thumbnail.jpg"
                        />
                        <PostBox
                            className="box-shadow-black"
                            date="8 Jan"
                            profileUrl="/avatar-1.png"
                            user="DeathVader"
                            description="I know a guy who can help in hacking the instagram accounts"
                        />
                        <div className="flex flex-col items-end">
                            <PostBox
                                className="box-shadow-black float-right"
                                date="8 Jan"
                                profileUrl="/avatar-1.png"
                                user="BurgerEater"
                                description="This app is so coooooool 🔥. Best social media app for College students."
                            />
                            <PostBox
                                className="box-shadow-black float-right"
                                date="8 Jan"
                                profileUrl="/avatar-1.png"
                                user="BurgerEater"
                                description="This app is so coooooool 🔥. Best social media app for College students."
                            />
                        </div>
                    </div>
                </div>
                <Sidebar />
            </div>
        </div>
    );
}
