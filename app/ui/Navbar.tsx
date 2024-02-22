"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutUser } from "@/lib/slices/userSlice";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import toast from "react-hot-toast";

// icons
import {
    ArrowRightStartOnRectangleIcon,
    BellIcon,
    HomeIcon,
    MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
    BellIcon as BellIconFilled,
    HomeIcon as HomeIconFilled,
    UserGroupIcon,
} from "@heroicons/react/24/solid";

export default function Navbar() {
    const pathname = usePathname();
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    
    const handleLogout = async () => {
        try {
            await dispatch(logoutUser());
            toast.success("Logged out successfully");
            router.push("/login");
        } catch (error) {
            console.error("Logout error:", error);
            // Handle logout error, if needed
        }
    };
    return (
        <header className="h-screen w-[240px] top-0 bg-white border-black fixed pt-4 flex flex-col">
            <div className="h-[70px] px-4 flex items-center">
                <h1 className="text-2xl font-primary font-bold p-2 flex gap-3">
                    <UserGroupIcon className={`w-8 h-8 `} />
                    CK
                </h1>
            </div>
            <nav className="flex flex-1 flex-col justify-between p-4">
                <div className="">
                    <ul className="flex flex-col w-full gap-2">
                        <li className="flex gap-4 items-center cursor-pointer">
                            <Link
                                href={"/home"}
                                className={`flex gap-4 items-center font-secondary w-full p-2 hover:bg-[#F1F2F5]  rounded-lg transition ease-in-out box-border ${
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
                                className={`flex gap-4 items-center font-secondary w-full p-2  hover:bg-[#F1F2F5] rounded-lg transition ease-in-out ${
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
                                className={`flex gap-4 items-center font-secondary w-full p-2 hover:bg-[#F1F2F5] rounded-lg transition ease-in-out ${
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
                <button
                    onClick={handleLogout}
                    className="bg-college-bg-grey rounded-xl flex items-center px-3 py-3 font-secondary font-semibold text-sm gap-2"
                >
                    <ArrowRightStartOnRectangleIcon className="w-6 h-6" />
                    Logout
                </button>
            </nav>
        </header>
    );
}
