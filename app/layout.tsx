import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import { Toaster } from "react-hot-toast";
import StoreProvider from "./StoreProvider";

export const metadata: Metadata = {
    title: "GossipCamp",
    description:
        "GossipCamp is a social media platform for college students to connect with each other.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="">
            <body
                className="min-w-screen min-h-screen box-border"
                suppressHydrationWarning={true}
            >
                <StoreProvider>{children}</StoreProvider>
                <Toaster />
            </body>
        </html>
    );
}
