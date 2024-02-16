"use client";

import React from "react";

// icons
import {
    BellIcon,
    HomeIcon,
    MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
    BellIcon as BellIconFilled,
    HomeIcon as HomeIconFilled,
} from "@heroicons/react/24/solid";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname();
    return (
        <header className="h-screen w-[220px] border-r-1 border-black fixed flex flex-col">
            <div className="h-[70px] px-4 flex items-center">
                <h1 className="text-2xl font-primary font-bold ">
                    CollegeKhabar
                </h1>
            </div>
            <nav className="h-full flex flex-col justify-between p-4">
                <div className="">
                    <ul className="flex flex-col w-full gap-2">
                        <li className="flex gap-4 items-center cursor-pointer">
                            <Link
                                href={"/home"}
                                className={`flex gap-4 items-center font-secondary w-full py-2 pl-2 hover:bg-[#F1F2F5]  rounded-lg transition ease-in-out box-border ${
                                    pathname === "/home" ? "font-bold" : ""
                                }`}
                            >
                                {pathname === "/home" ? (
                                    <HomeIconFilled className={`w-8 h-8`} />
                                ) : (
                                    <HomeIcon className={`w-8 h-8`} />
                                )}
                                Home
                            </Link>
                        </li>
                        <li className="cursor-pointer">
                            <Link
                                href={"/explore/people"}
                                className={`flex gap-4 items-center font-secondary w-full py-2 pl-2  hover:bg-[#F1F2F5] rounded-lg transition ease-in-out ${
                                    pathname === "/explore" ? "font-bold" : ""
                                }`}
                            >
                                <MagnifyingGlassIcon
                                    className={`w-8 h-8 ${
                                        pathname === "/explore"
                                            ? "stroke-[3]"
                                            : ""
                                    }`}
                                />
                                Explore
                            </Link>
                        </li>
                        <li className="cursor-pointer">
                            <Link
                                href={"/notifications"}
                                className={`flex gap-4 items-center font-secondary w-full py-2  pl-2 hover:bg-[#F1F2F5] rounded-lg transition ease-in-out ${
                                    pathname === "/notifications"
                                        ? "font-bold"
                                        : ""
                                }`}
                            >
                                {pathname === "/notifications" ? (
                                    <BellIconFilled className={`w-8 h-8`} />
                                ) : (
                                    <BellIcon className={`w-8 h-8`} />
                                )}
                                Notifications
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="flex gap-2">
                    <div>
                        <div className="relative h-[45px] w-[45px]">
                            <Image
                                src="/avatar-1.png"
                                alt="avatar-1"
                                fill
                                className="object-cover rounded-full border-1 border-black"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-secondary font-bold text-base">
                            @BurgerEater
                        </span>
                        <span className="font-secondary text-gray-500 text-sm">
                            Profile
                        </span>
                    </div>
                </div>
            </nav>
        </header>
    );
}
