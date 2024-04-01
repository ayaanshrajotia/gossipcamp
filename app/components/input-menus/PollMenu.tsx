import { TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import React from "react";

export default function PollMenu({ closePollMenu }: any) {
    return (
        <div className="absolute bottom-[55px] left-0 bg-white w-[480px] rounded-lg border-[1px] border-stone-400 p-4 dark:bg-college-dark-gray-2 dark:border-college-dark-gray-3">
            <div className="flex justify-between items-center mb-3">
                <h1 className=" pl-2 text-sm">OPTIONS</h1>
                <XMarkIcon
                    className="w-5 h-5 stroke-[#565759] dark:stroke-college-dark-white-2 cursor-pointer"
                    onClick={closePollMenu}
                />
            </div>
            <ul className="bg-college-bg-grey rounded-[8px] flex flex-col divide-y-[1px] divide-gray-200 dark:bg-college-dark-gray-3 dark:divide-college-dark-gray-1 ">
                <li>
                    <input
                        type="text"
                        className="bg-transparent outline-none w-full p-2.5 px-4 text-sm placeholder:text-college-dark-white-2"
                        placeholder="Add or leave blank"
                    />
                </li>
                <li>
                    <input
                        type="text"
                        className="bg-transparent outline-none w-full p-2.5 px-4 text-sm placeholder:text-college-dark-white-2"
                        placeholder="Add or leave blank"
                    />
                </li>
                <li>
                    <input
                        type="text"
                        className="bg-transparent outline-none w-full p-2.5 px-4 text-sm placeholder:text-college-dark-white-2"
                        placeholder="Add or leave blank"
                    />
                </li>
                <li>
                    <input
                        type="text"
                        className="bg-transparent outline-none w-full p-2.5 px-4 text-sm placeholder:text-college-dark-white-2"
                        placeholder="Add or leave blank"
                    />
                </li>
            </ul>
        </div>
    );
}
