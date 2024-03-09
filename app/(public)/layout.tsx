"use client";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { connectSocket, disconnectSocket } from "@/lib/slices/socketSlice";

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(connectSocket());
        window.addEventListener("beforeunload", () => {
            dispatch(disconnectSocket());
        });

        return () => {
            dispatch(disconnectSocket());
        };
    }, [dispatch]);

    return (
        <div className="flex relative">
            <Navbar />
            <main className="min-h-screen relative flex w-[calc(100%-240px)] ml-auto bg-college-bg-grey items-start gap-6">
                <div className="relative flex gap-2 w-[calc(100%-340px)]">
                    {children}
                </div>
                <Sidebar />
            </main>
        </div>
    );
}
