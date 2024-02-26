import React from "react";

function page() {
    return (
        <div className="min-h-screen relative w-full font-secondary">
            <div className="pt-4 sticky w-full top-0 z-[999]">
                <div className="bg-stone-800 text-white flex items-center gap-4 h-[65px] px-4 rounded-xl mx-6">
                    <h1 className="font-secondary font-bold text-2xl">
                        Notifications
                    </h1>
                </div>
            </div>
        </div>
    );
}

export default page;
