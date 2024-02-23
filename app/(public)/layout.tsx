import Navbar from "../ui/Navbar";
import Sidebar from "../ui/Sidebar";

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="h-screen relative">
            <div className="flex">
                <Navbar />
                <div className="relative w-full ml-[220px] mr-[320px] bg-[#F1F2F5]">
                    {children}
                </div>
                <Sidebar />
            </div>
        </div>
    );
}
