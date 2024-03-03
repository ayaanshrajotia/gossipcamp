"use client";

import Header from "@/app/components/Header";
import RoomBoxBigger from "@/app/components/room-boxes/RoomBoxBigger";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const options = [
    {
        id: 1,
        title: "People",
        slug: "/explore/people",
    },
    {
        id: 2,
        title: "Rooms",
        slug: "/explore/rooms",
    },
    {
        id: 3,
        title: "Colleges",
        slug: "/explore/colleges",
    },
    {
        id: 4,
        title: "Posts",
        slug: "/explore/posts",
    },
];

function Page({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    return (
        <div className="min-h-screen relative w-full font-secondary">
            <Header>Explore</Header>
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
                        {options.map((option) => (
                            <Link href={option.slug} key={option.id}>
                                <li
                                    className={`border-1 cursor-pointer rounded-2xl border-stone-800  p-1 px-4 font-semibold transition-all hover:bg-stone-800 hover:text-white ${
                                        pathname.includes(option.slug)
                                            ? "bg-stone-800 text-white"
                                            : "bg-white"
                                    }`}
                                >
                                    {option.title}
                                </li>
                            </Link>
                        ))}
                    </ul>
                </div>
                {children}
            </div>
        </div>
    );
}

export default Page;
