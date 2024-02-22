"use client";

const Home = () => {
    return (
        <div className="min-h-screen relative px-6 w-full pt-4">
            <div className="h-[70px]">
                <div className="sticky w-full top-4 bg-white dark:bg-slate-900 z-[999] flex items-center gap-4  px-4 h-[60px] rounded-xl box-shadow-black border-1">
                    <h1 className="font-secondary font-extrabold text-2xl">
                        Home
                    </h1>
                </div>
            </div>
            <div className="mt-4">
                <div className="bg-red-100 text-2xl p-4 rounded-xl">
                    Ayaansh
                </div>
                <div className="bg-red-100 text-2xl p-4 rounded-xl">
                    Ayaansh
                </div>
                <div className="bg-red-100 text-2xl p-4 rounded-xl">
                    Ayaansh
                </div>
            </div>
        </div>
    );
};

export default Home;
