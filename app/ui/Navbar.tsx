import React from "react";
import Container from "./Container";

// icons
import { HomeIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export default function Navbar() {
    return (
        <header className="h-screen w-[220px] border-r-2 fixed flex flex-col">
            <div className="h-[70px] px-4 flex items-center">
                <h1 className="text-2xl font-primary font-bold ">
                    CollegeKhabar
                </h1>
            </div>
            <nav className="h-full flex flex-col justify-between p-4">
                <div className="">
                    <ul className="flex flex-col gap-4">
                        <li className="flex gap-4 items-center cursor-pointer">
                            <HomeIcon className="w-8 h-8" />
                            Home
                        </li>
                        <li className="flex gap-4 items-center cursor-pointer">
                            <MagnifyingGlassIcon className="w-8 h-8" />
                            Explore
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
