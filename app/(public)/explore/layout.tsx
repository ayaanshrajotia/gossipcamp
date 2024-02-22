import RoomBoxBigger from "@/app/ui/room-boxes/RoomBoxBigger";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";

function page({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen relative px-6 w-full pt-6">
            <div className="sticky w-full top-4 bg-white dark:bg-slate-900 z-[999] flex items-center gap-4 h-[70px] px-4 rounded-xl box-shadow-yellow-static">
                <h1 className="font-secondary text-2xl font-extrabold">
                    Explore
                </h1>
            </div>
            <div className="p-6">
                <div className="border-1 font-secondary box-shadow-yellow mt-1 flex h-12 w-full items-center rounded-xl border-black bg-white p-3 text-lg">
                    <MagnifyingGlassIcon className="h-7 w-7" />
                    <input
                        type="text"
                        className="mx-3 h-10 w-full outline-none"
                    />
                </div>
                <div className="py-5">
                    <ul className="flex justify-evenly">
                        <li className="border-1 cursor-pointer rounded-2xl border-black bg-white p-1 px-4 font-semibold transition-all hover:bg-black hover:text-white">
                            <Link href="/explore/people">People</Link>
                        </li>
                        <li className="border-1 cursor-pointer rounded-2xl border-black bg-white p-1 px-4 font-semibold transition-all hover:bg-black hover:text-white">
                            <Link href="/explore/rooms">Rooms</Link>
                        </li>
                        <li className="border-1 cursor-pointer rounded-2xl border-black bg-white p-1 px-4 font-semibold transition-all hover:bg-black hover:text-white">
                            <Link href="/explore/colleges">Colleges</Link>
                        </li>
                        <li className="border-1 cursor-pointer rounded-2xl border-black bg-white p-1 px-4 font-semibold transition-all hover:bg-black hover:text-white">
                            <Link href="/explore/posts">Posts</Link>
                        </li>
                    </ul>
                </div>
                {children}
            </div>
        </div>
    );
}

export default page;
