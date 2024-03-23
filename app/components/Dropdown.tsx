"use client";

import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { DropdownPropsType } from "../utils/definitions";
import { capitalizeFirstLetter } from "../utils/helper";

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
            className={`flex flex-col justify-between text-sm w-[120px] gap-y-1.5 rounded-lg bg-white py-1.5 px-1.5 text-gray-900 border-1 border-stone-400 transition ease-in-out duration-200 hover:shadow-non outline-none dark:bg-college-dark-gray-1 dark:text-college-dark-white dark:border-college-dark-gray-2 ${className}`}
            {...props}
        >
            {options?.map((option) => (
                <li
                    key={option.id}
                    className="cursor-pointer hover:bg-gray-200 px-2 py-0.5 rounded-lg dark:hover:bg-college-dark-gray-3"
                    onClick={option.action}
                >
                    {option.name}
                </li>
            ))}
        </ul>
    );
}
