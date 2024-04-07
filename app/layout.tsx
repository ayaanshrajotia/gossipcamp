import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import StoreProvider from "./StoreProvider";
import { ThemeProvider } from "next-themes";

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
        <html lang="en" suppressHydrationWarning>
            <body
                className={`bg-[#F6F6F9] min-w-screen min-h-screen box-border dark:bg-college-dark-gray-2`}
            >
                <ThemeProvider attribute="class" enableSystem={false}>
                    <StoreProvider>{children}</StoreProvider>
                </ThemeProvider>
                <Toaster />
            </body>
        </html>
    );
}
