import React from "react";

function Header({ children }: { children: React.ReactNode }) {
    return (
        <div className="pt-4 sticky w-full top-0 z-[999]">
            <div className=" max-[1130px]:mr-0 bg-college-dark-gray-1 text-white flex items-center gap-4 h-[65px] px-4 rounded-xl ml-6 mr-6 dark:bg-college-dark-white dark:text-college-dark-gray-1">
                <h1 className="font-secondary font-bold text-2xl">
                    {children}
                </h1>
            </div>
        </div>
    );
}

export default Header;
