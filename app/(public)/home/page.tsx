"use client";

import { AppDispatch } from "@/lib/store";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/lib/slices/userSlice";
import { useRouter } from "next/navigation";
import { cookies } from "next/headers";

const Home = () => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    return (
        <div className="min-h-screen relative">
            <div className="sticky w-full top-0 bg-white dark:bg-slate-900 z-[999] flex items-center px-4 gap-4 border-b-1 border-black h-[70px]">
                <h1 className="font-secondary font-extrabold text-2xl">Home</h1>
                <button
                    onClick={() => {
                        dispatch(logoutUser());
                        // router.push("/login");
                    }}
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Home;
