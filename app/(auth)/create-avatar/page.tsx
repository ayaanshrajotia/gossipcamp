"use client";

import Button from "@/app/ui/Button";
import Dropdown from "@/app/ui/Dropdown";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
    accessoriesTypeOptions,
    clotheTypeOptions,
    eyeTypeOptions,
    eyebrowTypeOptions,
    facialHairColorOptions,
    facialHairTypeOptions,
    firstNames,
    hairColorOptions,
    lastNames,
    mouthTypeOptions,
    skinColorOptions,
    topTypeOptions,
} from "../../utils/customOptions";
import { capitalizeFirstLetter } from "../../utils/helper";

function CreateAvatar() {
    const [firstName, setFirstName] = useState("Choose First Name");
    const [lastName, setlastName] = useState("Choose Last Name");
    const [avatarParams, setAvatarParams] = useState({
        avatarStyle: "Circle",
        topType: "LongHairStraight",
        accessoriesType: "Blank",
        hairColor: "BrownDark",
        facialHairColor: "BlondeGolden",
        facialHairType: "Blank",
        clotheType: "BlazerShirt",
        eyeType: "Default",
        eyebrowType: "Default",
        mouthType: "Default",
        skinColor: "Light",
    });

    console.log(avatarParams);

    const url = `https://avataaars.io/?avatarStyle=Circle&${avatarParams.accessoriesType}&topType=${avatarParams.topType}&accessoriesType=${avatarParams.accessoriesType}&hairColor=${avatarParams.hairColor}&facialHairType=${avatarParams.facialHairType}&clotheType=${avatarParams.clotheType}&eyebrowType=${avatarParams.eyebrowType}&mouthType=${avatarParams.mouthType}&skinColor=${avatarParams.skinColor}&eyeType=${avatarParams.eyeType}`;

    console.log(url);

    return (
        <div className="w-[1200px] flex flex-col gap-10 items-center font-secondary">
            <h1 className="font-primary font-extrabold text-5xl text-college-grey">
                Create your Avatar!
            </h1>
            <div className="flex w-full gap-14">
                {/* Left Side */}
                <div className="w-1/2 flex flex-col gap-5">
                    <div className="flex flex-col gap-1">
                        <span className="font-semibold ">Name</span>
                        <div className="flex gap-6">
                            <select
                                name=""
                                id=""
                                className="flex justify-between items-center w-full h-12 gap-x-1.5 rounded-lg bg-white px-2 py-2 text-gray-900 box-shadow border-1 border-black transition ease-in-out duration-200 hover:shadow-non outline-none text-sm cursor-pointer"
                                onChange={(e) => setFirstName(e.target.value)}
                            >
                                {firstNames?.map((item) => (
                                    <option key={item.id} value={item.name}>
                                        {capitalizeFirstLetter(item.name)}
                                    </option>
                                ))}
                            </select>
                            <select
                                name=""
                                id=""
                                className="flex justify-between items-center w-full h-12 gap-x-1.5 rounded-lg bg-white px-2 py-2 text-gray-900 box-shadow border-1 border-black transition ease-in-out duration-200 hover:shadow-non outline-none text-sm cursor-pointer"
                                onChange={(e) => setlastName(e.target.value)}
                            >
                                {lastNames?.map((item) => (
                                    <option key={item.id} value={item.name}>
                                        {capitalizeFirstLetter(item.name)}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="font-semibold ">
                            Hair Type and Color
                        </span>
                        <div className="flex gap-6">
                            <select
                                name=""
                                id=""
                                className="flex justify-between items-center w-full h-12 gap-x-1.5 rounded-lg bg-white px-2 py-2 text-gray-900 box-shadow border-1 border-black transition ease-in-out duration-200 hover:shadow-non outline-none text-sm cursor-pointer"
                                onChange={(e) =>
                                    setAvatarParams((prev) => ({
                                        ...prev,
                                        topType: e.target.value,
                                    }))
                                }
                            >
                                {topTypeOptions?.map((item) => (
                                    <option key={item.id} value={item.name}>
                                        {capitalizeFirstLetter(item.name)}
                                    </option>
                                ))}
                            </select>
                            <select
                                name=""
                                id=""
                                className="flex justify-between items-center w-full h-12 gap-x-1.5 rounded-lg bg-white px-2 py-2 text-gray-900 box-shadow border-1 border-black transition ease-in-out duration-200 hover:shadow-non outline-none text-sm cursor-pointer"
                                onChange={(e) =>
                                    setAvatarParams((prev) => ({
                                        ...prev,
                                        hairColor: e.target.value,
                                    }))
                                }
                            >
                                {hairColorOptions?.map((item) => (
                                    <option key={item.id} value={item.name}>
                                        {capitalizeFirstLetter(item.name)}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="font-semibold ">
                            Accessories and Skin Color
                        </span>
                        <div className="flex gap-6">
                            <select
                                name=""
                                id=""
                                className="flex justify-between items-center w-full h-12 gap-x-1.5 rounded-lg bg-white px-2 py-2 text-gray-900 box-shadow border-1 border-black transition ease-in-out duration-200 hover:shadow-non outline-none text-sm cursor-pointer"
                                onChange={(e) =>
                                    setAvatarParams((prev) => ({
                                        ...prev,
                                        accessoriesType: e.target.value,
                                    }))
                                }
                            >
                                {accessoriesTypeOptions?.map((item) => (
                                    <option key={item.id} value={item.name}>
                                        {capitalizeFirstLetter(item.name)}
                                    </option>
                                ))}
                            </select>
                            <select
                                name=""
                                id=""
                                className="flex justify-between items-center w-full h-12 gap-x-1.5 rounded-lg bg-white px-2 py-2 text-gray-900 box-shadow border-1 border-black transition ease-in-out duration-200 hover:shadow-non outline-none text-sm cursor-pointer"
                                onChange={(e) =>
                                    setAvatarParams((prev) => ({
                                        ...prev,
                                        skinColor: e.target.value,
                                    }))
                                }
                            >
                                {skinColorOptions?.map((item) => (
                                    <option key={item.id} value={item.name}>
                                        {capitalizeFirstLetter(item.name)}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="font-semibold ">
                            Facial Hair Type & Color
                        </span>
                        <div className="flex gap-6">
                            <select
                                name=""
                                id=""
                                className="flex justify-between items-center w-full h-12 gap-x-1.5 rounded-lg bg-white px-2 py-2 text-gray-900 box-shadow border-1 border-black transition ease-in-out duration-200 hover:shadow-none outline-none text-sm"
                                onChange={(e) =>
                                    setAvatarParams((prev) => ({
                                        ...prev,
                                        facialHairType: e.target.value,
                                    }))
                                }
                            >
                                {facialHairTypeOptions?.map((item) => (
                                    <option key={item.id} value={item.name}>
                                        {capitalizeFirstLetter(item.name)}
                                    </option>
                                ))}
                            </select>
                            <select
                                name=""
                                id=""
                                className="flex justify-between items-center w-full h-12 gap-x-1.5 rounded-lg bg-white px-2 py-2 text-gray-900 box-shadow border-1 border-black transition ease-in-out duration-200 hover:shadow-non outline-none text-sm cursor-pointer"
                                onChange={(e) =>
                                    setAvatarParams((prev) => ({
                                        ...prev,
                                        fa: e.target.value,
                                    }))
                                }
                            >
                                {facialHairColorOptions?.map((item) => (
                                    <option key={item.id} value={item.name}>
                                        {capitalizeFirstLetter(item.name)}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="font-semibold ">
                            Cloth Type & Eye Type
                        </span>
                        <div className="flex gap-6">
                            <select
                                name=""
                                id=""
                                className="flex justify-between items-center w-full h-12 gap-x-1.5 rounded-lg bg-white px-2 py-2 text-gray-900 box-shadow border-1 border-black transition ease-in-out duration-200 hover:shadow-non outline-none text-sm cursor-pointer"
                                onChange={(e) =>
                                    setAvatarParams((prev) => ({
                                        ...prev,
                                        clotheType: e.target.value,
                                    }))
                                }
                            >
                                {clotheTypeOptions?.map((item) => (
                                    <option key={item.id} value={item.name}>
                                        {capitalizeFirstLetter(item.name)}
                                    </option>
                                ))}
                            </select>
                            <select
                                name=""
                                id=""
                                className="flex justify-between items-center w-full h-12 gap-x-1.5 rounded-lg bg-white px-2 py-2 text-gray-900 box-shadow border-1 border-black transition ease-in-out duration-200 hover:shadow-non outline-none text-sm cursor-pointer"
                                onChange={(e) =>
                                    setAvatarParams((prev) => ({
                                        ...prev,
                                        eyeType: e.target.value,
                                    }))
                                }
                            >
                                {eyeTypeOptions?.map((item) => (
                                    <option key={item.id} value={item.name}>
                                        {capitalizeFirstLetter(item.name)}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="font-semibold ">
                            Eyebrow Type & Mouth Type
                        </span>
                        <div className="flex gap-6">
                            <select
                                name=""
                                id=""
                                className="flex justify-between items-center w-full h-12 gap-x-1.5 rounded-lg bg-white px-2 py-2 text-gray-900 box-shadow border-1 border-black transition ease-in-out duration-200 hover:shadow-non outline-none text-sm cursor-pointer"
                                onChange={(e) =>
                                    setAvatarParams((prev) => ({
                                        ...prev,
                                        eyebrowType: e.target.value,
                                    }))
                                }
                            >
                                {eyebrowTypeOptions?.map((item) => (
                                    <option key={item.id} value={item.name}>
                                        {capitalizeFirstLetter(item.name)}
                                    </option>
                                ))}
                            </select>
                            <select
                                name=""
                                id=""
                                className="flex justify-between items-center text-base w-full h-12 gap-x-1.5 rounded-lg bg-white px-2 py-2 text-gray-900 box-shadow border-1 border-black transition ease-in-out duration-200 hover:shadow-non outline-none text-sm cursor-pointer"
                                onChange={(e) =>
                                    setAvatarParams((prev) => ({
                                        ...prev,
                                        mouthType: e.target.value,
                                    }))
                                }
                            >
                                {mouthTypeOptions?.map((item) => (
                                    <option key={item.id} value={item.name}>
                                        {capitalizeFirstLetter(item.name)}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                {/* Right Side */}
                <div className="w-1/2 flex justify-end">
                    <div className="relative w-[420px] text-base gap-x-1.5 rounded-3xl bg-gray-200 p-7 pt-14 text-gray-900 cursor-pointer">
                        <div className="h-[100px] w-[60px] bg-black absolute -top-[70px] left-0 right-0 mx-auto"></div>
                        <div className="bg-white rounded-2xl p-4 h-full flex flex-col items-center gap-6">
                            <div className="relative h-[160px] w-[160px]">
                                <Image
                                    src={url}
                                    alt="avatar-1"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="text-4xl font-bold mb-3">
                                    {firstName !== "Choose First Name"
                                        ? capitalizeFirstLetter(firstName)
                                        : "Black"}
                                    {lastName !== "Choose Last Name"
                                        ? capitalizeFirstLetter(lastName)
                                        : "Bear"}
                                </span>
                                <div className="flex flex-col items-center">
                                    <span className="text-lg">
                                        <span className="font-medium">
                                            Enrollment No:{" "}
                                        </span>
                                        0176CD211033
                                    </span>
                                    <span className="text-lg">
                                        <span className="font-medium">
                                            Mobile No:{" "}
                                        </span>{" "}
                                        90120XXXXX
                                    </span>
                                    <span className="text-lg">
                                        <span className="font-medium">
                                            College Name:{" "}
                                        </span>{" "}
                                        LNCT Bhopal
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Button
                bgColor="#fdd800"
                textColor="#000000"
                type="submit"
                className=""
            >
                Enter
            </Button>
        </div>
    );
}

export default CreateAvatar;
