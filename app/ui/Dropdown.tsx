"use client";

import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { DropdownPropsType } from "../lib/definitions";
import { colleges } from "../lib/customOptions";
import { capitalizeFirstLetter } from "../lib/helper";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

export default function Dropdown({
    options,
    handleOptions,
    className,
}: DropdownPropsType) {
    return (
        <select
            name=""
            id=""
            className="flex justify-between items-center text-base w-full h-12 gap-x-1.5 rounded-lg bg-white px-2 py-2 font-semibold text-gray-900 box-shadow border-1 border-black transition ease-in-out duration-200 hover:shadow-non outline-none"
        >
            {options?.map((item) => (
                <option key={item.id} value={item.name}>
                    {capitalizeFirstLetter(item.name)}
                </option>
            ))}
        </select>
    );
}
