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
            <main className="min-h-screen relative flex w-[calc(100%-240px)] ml-auto bg-college-bg-grey dark:bg-college-dark-gray-1 items-start gap-6">
                <div className="relative flex gap-2 w-[calc(100%-340px)]">
                    {children}
                </div>
                <Sidebar />
            </main>
        </div>
    );
}
