import React from "react";

function Header({ children }: { children: React.ReactNode }) {
    return (
        <div className="pt-4 sticky w-full top-0 z-[999]">
            <div className="bg-stone-800 text-white flex items-center gap-4 h-[65px] px-4 rounded-xl mx-6 ">
                <h1 className="font-secondary font-bold text-2xl">
                    {children}
                </h1>
            </div>
        </div>
    );
}

export default Header;
