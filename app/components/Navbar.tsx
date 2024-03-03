"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutUser } from "@/lib/slices/authSlice";
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
        <header className="light-shadow fixed top-0 z-[999] flex h-screen w-[240px] flex-col border-black bg-[#ffffff] pt-4">
            <div className="flex h-[70px] items-center px-4">
                <h1 className="font-secondary flex gap-3 p-2 text-2xl font-bold">
                    {/* <UserGroupIcon className={`w-8 h-8 `} /> */}
                    GossipCamp
                </h1>
            </div>
            <nav className="mb-2 flex flex-1 flex-col justify-between p-4">
                <div className="">
                    <ul className="flex w-full flex-col gap-2">
                        <li className="flex cursor-pointer items-center gap-4">
                            <Link
                                href={"/home"}
                                className={`font-secondary box-border flex w-full items-center gap-4 rounded-lg  p-2 transition ease-in-out hover:bg-[#F1F2F5] ${
                                    pathname === "/home" ? "font-bold" : ""
                                }`}
                            >
                                {pathname === "/home" ? (
                                    <HomeIconFilled className={`h-8 w-8`} />
                                ) : (
                                    <HomeIcon className={`h-8 w-8`} />
                                )}
                                Home
                            </Link>
                        </li>
                        <li className="cursor-pointer">
                            <Link
                                href={"/explore/people"}
                                className={`font-secondary flex w-full items-center gap-4 rounded-lg  p-2 transition ease-in-out hover:bg-[#F1F2F5] ${
                                    pathname.includes("/explore")
                                        ? "font-bold"
                                        : ""
                                }`}
                            >
                                <MagnifyingGlassIcon
                                    className={`h-8 w-8 ${
                                        pathname.includes("/explore")
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
                                className={`font-secondary flex w-full items-center gap-4 rounded-lg p-2 transition ease-in-out hover:bg-[#F1F2F5] ${
                                    pathname === "/notifications"
                                        ? "font-bold"
                                        : ""
                                }`}
                            >
                                {pathname === "/notifications" ? (
                                    <BellIconFilled className={`h-8 w-8`} />
                                ) : (
                                    <BellIcon className={`h-8 w-8`} />
                                )}
                                Notifications
                            </Link>
                        </li>
                    </ul>
                </div>
                <button
                    onClick={handleLogout}
                    className="bg-college-yellow font-secondary flex items-center gap-2 rounded-full px-4 py-2.5 text-base font-bold"
                >
                    <ArrowRightStartOnRectangleIcon className="h-6 w-6 stroke-[2]" />
                    Logout
                </button>
            </nav>
        </header>
    );
}
