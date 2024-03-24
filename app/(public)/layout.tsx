"use client";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex relative">
            <Navbar />
            <main className="max-[1330px]:w-[calc(100%-70px)] max-[1160px]:gap-0  min-h-screen relative flex w-[calc(100%-240px)] ml-auto bg-college-bg-grey dark:bg-college-dark-gray-1 items-start gap-6">
                <div className="max-[1160px]:w-[calc(100%-80px)] relative flex gap-2 w-[calc(100%-340px)]">
                    {children}
                </div>
                <Sidebar />
            </main>
        </div>
    );
}
