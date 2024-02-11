import Image from "next/image";
import Navbar from "../../ui/Navbar";
import Sidebar from "../../ui/Sidebar";
import PostBox from "../../ui/post-containers/PostBox";

export default function Home() {
    return (
        <div className="min-h-screen relative">
            <div className="sticky w-full top-0 bg-white dark:bg-slate-900 z-[999] flex items-center px-4 gap-4 border-b-1 border-black h-[70px]">
                <h1 className="font-secondary font-extrabold text-2xl">Home</h1>
            </div>
        </div>
    );
}
