"use client";

import Header from "@/app/components/Header";
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
            <div className="my-6 px-6">
                <div className="border-1 font-secondary mt-1 flex h-12 w-full items-center rounded-xl border-college-dark-gray-1 bg-white p-3 text-lg dark:bg-college-dark-gray-1">
                    <MagnifyingGlassIcon className="h-7 w-7 dark:stroke-college-dark-white" />
                    <input
                        type="text"
                        className="mx-3 h-10 w-full outline-none bg-white dark:bg-college-dark-gray-1"
                    />
                </div>
                <div className="py-5">
                    <ul className="flex justify-evenly">
                        {options.map((option) => (
                            <Link href={option.slug} key={option.id}>
                                <li
                                    className={`border-1 cursor-pointer rounded-2xl border-college-dark-gray-1  p-1 px-4 font-semibold transition-all hover:bg-college-dark-gray-1 hover:text-white ${
                                        pathname.includes(option.slug)
                                            ? "bg-college-dark-gray-1 text-white dark:text-college-dark-gray-1 dark:bg-college-dark-white"
                                            : "bg-white dark:bg-college-dark-gray-1"
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
