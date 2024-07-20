"use client";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { RootState } from "@/lib/store";
import MessageBox from "../components/post-containers/MessageBox";
import GossipDiscussion from "../components/post-containers/GossipDiscussion";

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { blur } = useSelector((state: RootState) => state.blur);
    const { gossipDiscussion } = useSelector(
        (state: RootState) => state.gossipDiscussion
    );

    return (
        <div className="relative">
            {gossipDiscussion && <GossipDiscussion />}
            <Navbar
                className={`${
                    blur ? "blur-md pointer-events-none" : "blur-none"
                } ${gossipDiscussion ? "" : ""}`}
            />
            <main
                className={`max-[700px]:mb-16 max-[700px]:w-full max-[1330px]:w-[calc(100%-70px)] max-[1160px]:gap-0  min-h-screen relative flex w-[calc(100%-240px)] ml-auto bg-college-bg-grey dark:bg-college-dark-gray-1 items-start gap-6`}
            >
                <div className="max-[1160px]:w-full relative flex gap-2 w-[calc(100%-340px)]">
                    {children}
                </div>
                <Sidebar
                    className={`${
                        blur || gossipDiscussion
                            ? "blur-md pointer-events-none"
                            : "blur-none"
                    } ${gossipDiscussion ? "" : ""}`}
                />
            </main>
        </div>
    );
}
