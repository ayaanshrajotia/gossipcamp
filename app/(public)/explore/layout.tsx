"use client";

import RoomBoxBigger from "@/app/components/room-boxes/RoomBoxBigger";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function Page({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    return (
        <div className="min-h-screen relative w-full font-secondary">
            <div className="pt-4 sticky w-full top-0 z-[999]">
                <div className="bg-stone-800 text-white flex items-center gap-4 h-[70px] px-4 rounded-xl mx-6">
                    <h1 className="font-secondary font-bold text-2xl">
                        Explore
                    </h1>
                </div>
            </div>
            <div className="mt-6 px-6">
                <div className="border-1 font-secondary mt-1 flex h-12 w-full items-center rounded-xl border-stone-800 bg-white p-3 text-lg">
                    <MagnifyingGlassIcon className="h-7 w-7" />
                    <input
                        type="text"
                        className="mx-3 h-10 w-full outline-none"
                    />
                </div>
                <div className="py-5">
                    <ul className="flex justify-evenly">
                        <Link href="/explore/people">
                            <li
                                className={`border-1 cursor-pointer rounded-2xl border-stone-800  p-1 px-4 font-semibold transition-all hover:bg-stone-800 hover:text-white ${
                                    pathname.includes("/explore/people")
                                        ? "bg-stone-800 text-white"
                                        : "bg-white"
                                }`}
                            >
                                People
                            </li>
                        </Link>
                        <Link href="/explore/rooms">
                            <li
                                className={`border-1 cursor-pointer rounded-2xl border-stone-800  p-1 px-4 font-semibold transition-all hover:bg-stone-800 hover:text-white ${
                                    pathname.includes("/explore/rooms")
                                        ? "bg-stone-800 text-white"
                                        : "bg-white"
                                }`}
                            >
                                Rooms
                            </li>
                        </Link>
                        <Link href="/explore/colleges">
                            <li
                                className={`border-1 cursor-pointer rounded-2xl border-stone-800  p-1 px-4 font-semibold transition-all hover:bg-stone-800 hover:text-white ${
                                    pathname.includes("/explore/colleges")
                                        ? "bg-stone-800 text-white"
                                        : "bg-white"
                                }`}
                            >
                                Colleges
                            </li>
                        </Link>
                        <Link href="/explore/posts">
                            <li
                                className={`border-1 cursor-pointer rounded-2xl border-stone-800  p-1 px-4 font-semibold transition-all hover:bg-stone-800  hover:text-white ${
                                    pathname.includes("/explore/posts")
                                        ? "bg-stone-800 text-white"
                                        : "bg-white"
                                }`}
                            >
                                Posts
                            </li>
                        </Link>
                    </ul>
                </div>
                {children}
            </div>
        </div>
    );
}

export default Page;
