"use client";
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
    MoonIcon,
    SunIcon,
} from "@heroicons/react/24/outline";
import {
    BellIcon as BellIconFilled,
    HomeIcon as HomeIconFilled,
} from "@heroicons/react/24/solid";
import { useTheme } from "next-themes";

export default function Navbar() {
    const pathname = usePathname();
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const { systemTheme, theme, setTheme } = useTheme();
    const currentTheme = theme === "system" ? systemTheme : theme;

    const handleLogout = async () => {
        try {
            await dispatch(logoutUser());
            toast.success("Logged out successfully");
            router.push("/login");
            // setTheme("light");
        } catch (error) {
            console.error("Logout error:", error);
            // Handle logout error, if needed
        }
    };

    return (
        <header className="max-[700px]:items-center max-[700px]:pl-4 max-[700px]:flex-row max-[700px]:pt-0 max-[700px]:w-full max-[700px]:h-[70px] max-[700px]:bottom-0 max-[1330px]:w-[70px] light-shadow fixed z-[1000] flex h-screen w-[240px] flex-col border-black bg-[#ffffff] pt-4 dark:bg-college-dark-gray-0 ">
            <div className="max-[1330px]:justify-center max-[1330px]:p-0 flex h-[70px] items-center px-4">
                <h1 className="max-[1330px]:hidden font-secondary flex gap-3 text-2xl font-bold dark:text-college-dark-white">
                    {/* <UserGroupIcon className={`w-8 h-8 `} /> */}
                    GossipCamp
                </h1>
                <h1 className="min-[1330px]:hidden max-[1330px]:block font-secondary flex gap-3 p-2 text-2xl font-bold dark:text-college-dark-white">
                    {/* <UserGroupIcon className={`w-8 h-8 `} /> */}
                    GC
                </h1>
            </div>
            <nav className="max-[700px]:pl-2 max-[700px]:px-4 max-[700px]:flex-0 max-[700px]:mb-0 max-[700px]:items-center max-[700px]:p-0 max-[700px]:flex-row  max-[1330px]:px-3 mb-2 flex flex-1 flex-col justify-between p-4 ">
                <ul className="max-[700px]:gap-4 max-[700px]:flex-row flex w-full flex-col gap-2">
                    <li className="cursor-pointer dark:text-college-dark-white">
                        <Link
                            href={"/home"}
                            className={`max-[1300px]:justify-center font-secondary flex w-full items-center gap-3 rounded-lg  p-2 transition ease-in-out hover:bg-[#F1F2F5] dark:hover:bg-college-dark-gray-2 ${
                                pathname === "/home" ? "font-bold" : ""
                            }`}
                        >
                            {pathname === "/home" ? (
                                <HomeIconFilled className={` h-7 w-7`} />
                            ) : (
                                <HomeIcon className={` h-7 w-7`} />
                            )}
                            <span className="max-[1330px]:hidden">Home</span>
                        </Link>
                    </li>
                    <li className="cursor-pointer dark:text-college-dark-white">
                        <Link
                            href={"/explore/people"}
                            className={`max-[1300px]:justify-center font-secondary flex w-full items-center gap-3 rounded-lg  p-2 transition ease-in-out hover:bg-[#F1F2F5] dark:hover:bg-college-dark-gray-2 ${
                                pathname.includes("/explore") ? "font-bold" : ""
                            }`}
                        >
                            <MagnifyingGlassIcon
                                className={` h-7 w-7 ${
                                    pathname.includes("/explore")
                                        ? "stroke-[3]"
                                        : ""
                                }`}
                            />
                            <span className="max-[1330px]:hidden">Explore</span>
                        </Link>
                    </li>
                    <li className="cursor-pointer dark:text-college-dark-white">
                        <Link
                            href={"/notifications"}
                            className={`max-[1300px]:justify-center font-secondary flex w-full items-center gap-3 rounded-lg p-2 transition ease-in-out hover:bg-[#F1F2F5] dark:hover:bg-college-dark-gray-2 ${
                                pathname === "/notifications" ? "font-bold" : ""
                            }`}
                        >
                            {pathname === "/notifications" ? (
                                <BellIconFilled className={` h-7 w-7`} />
                            ) : (
                                <BellIcon className={` h-7 w-7`} />
                            )}
                            <span className="max-[1330px]:hidden">
                                Notifications
                            </span>
                        </Link>
                    </li>
                </ul>
                <ul className="max-[700px]:gap-4 max-[700px]:flex-row flex flex-col gap-2">
                    <li
                        onClick={() =>
                            theme == "dark"
                                ? setTheme("light")
                                : setTheme("dark")
                        }
                        className="max-[1300px]:justify-center font-secondary flex items-center gap-3 rounded-lg transition ease-in-out hover:bg-[#F1F2F5] p-2 text-base dark:text-college-dark-white dark:hover:bg-college-dark-gray-2 cursor-pointer"
                    >
                        {theme === "light" ? (
                            <>
                                <MoonIcon className=" h-7 w-7" />
                                <span className="max-[1330px]:hidden">
                                    Dark Mode
                                </span>
                            </>
                        ) : (
                            <>
                                <SunIcon className=" h-7 w-7" />
                                <span className="max-[1330px]:hidden">
                                    Light Mode
                                </span>
                            </>
                        )}
                    </li>
                    <li
                        onClick={handleLogout}
                        className="max-[1300px]:justify-center font-secondary flex items-center gap-3 rounded-lg transition ease-in-out hover:bg-[#F1F2F5] p-2 text-base dark:text-college-dark-white dark:hover:bg-college-dark-gray-2 cursor-pointer"
                    >
                        <ArrowRightStartOnRectangleIcon className=" h-7 w-7" />
                        <span className="max-[1330px]:hidden">Logout</span>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
