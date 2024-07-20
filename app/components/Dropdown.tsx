"use client";
import { DropdownPropsType } from "../utils/definitions";
import { v4 } from "uuid";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

export default function Dropdown({
    options,
    handleOptions,
    className,
    ...props
}: DropdownPropsType) {
    return (
        <ul
            className={`flex flex-col justify-between text-sm w-[120px] gap-y-1.5 rounded-lg bg-red-600 py-1.5 px-1.5 text-white transition ease-in-out duration-200 hover:shadow-non outline-none dark:bg-college-dark-gray-3 dark:text-college-dark-white dark:border-college-dark-gray-2 z-[999] ${className}`}
            {...props}
        >
            {options?.map((option) => (
                <li
                    key={v4()}
                    className="cursor-pointer hover:bg-red-800 px-2 py-1 rounded-[6px] dark:hover:bg-college-dark-gray-2 flex gap-2 text-base transition-all text-white"
                    onClick={option.action}
                >
                    {option?.icon}
                    {option.name}
                </li>
            ))}
        </ul>
    );
}


