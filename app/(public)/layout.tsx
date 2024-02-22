import Navbar from "../ui/Navbar";
import Sidebar from "../ui/Sidebar";

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex relative">
            <Navbar />
            <main className="min-h-screen relative flex w-[calc(100%-240px)] ml-auto bg-college-bg-grey items-start gap-6">
                <div className="flex gap-2 w-[calc(100%-340px)] border-r-1">
                    {children}
                </div>
                <Sidebar />
            </main>
        </div>
    );
}
