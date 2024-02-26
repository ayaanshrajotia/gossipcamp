"use client";

import Button from "@/app/components/Button";
import Dropdown from "@/app/components/Dropdown";
import Image from "next/image";
import { useEffect, useLayoutEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { createAvatar } from "@/lib/slices/userSlice";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { any } from "zod";

function CreateAvatar() {
    const [firstName, setFirstName] = useState("Choose First Name");
    const [lastName, setlastName] = useState("Choose Last Name");
    const [userDetails, setUserDetails] = useState<any>({});
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
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const { user } = useSelector((state: RootState) => state.user || "");
    console.log(userDetails);

    useLayoutEffect(() => {
        setUserDetails(user);
    }, [userDetails]);

    const url = `https://avataaars.io/?avatarStyle=Circle&${avatarParams.accessoriesType}&topType=${avatarParams.topType}&accessoriesType=${avatarParams.accessoriesType}&hairColor=${avatarParams.hairColor}&facialHairType=${avatarParams.facialHairType}&clotheType=${avatarParams.clotheType}&eyebrowType=${avatarParams.eyebrowType}&mouthType=${avatarParams.mouthType}&skinColor=${avatarParams.skinColor}&eyeType=${avatarParams.eyeType}`;

    const handleCreateProfile = async () => {
        try {
            if (
                firstName === "Choose First Name" ||
                lastName === "Choose Last Name"
            ) {
                toast.error("Please select your name");
                return;
            }
            await dispatch(
                createAvatar({
                    fName: firstName,
                    lName: lastName,
                    avatarUrl: url,
                })
            );
            router.push("/home");
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

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
                                className="flex justify-between items-center w-full h-12 gap-x-1.5 rounded-lg bg-white px-2 py-2 text-gray-900 box-shadow-yellow-static border-1 border-black transition ease-in-out duration-200 hover:shadow-non outline-none text-sm cursor-pointer"
                                onChange={(e) => setFirstName(e.target.value)}
                            >
                                {firstNames?.slice(0, 1).map((item) => (
                                    <option
                                        key={item.id}
                                        value={""}
                                        disabled={true}
                                        selected={true}
                                    >
                                        {capitalizeFirstLetter(item.name)}
                                    </option>
                                ))}
                                {firstNames?.slice(1).map((item) => (
                                    <option key={item.id} value={item.name}>
                                        {capitalizeFirstLetter(item.name)}
                                    </option>
                                ))}
                            </select>
                            <select
                                name=""
                                id=""
                                className="flex justify-between items-center w-full h-12 gap-x-1.5 rounded-lg bg-white px-2 py-2 text-gray-900 box-shadow-yellow-static border-1 border-black transition ease-in-out duration-200 hover:shadow-non outline-none text-sm cursor-pointer"
                                onChange={(e) => setlastName(e.target.value)}
                            >
                                {lastNames?.slice(0, 1).map((item) => (
                                    <option
                                        key={item.id}
                                        value={""}
                                        disabled={true}
                                        selected={true}
                                    >
                                        {capitalizeFirstLetter(item.name)}
                                    </option>
                                ))}
                                {lastNames?.slice(1).map((item) => (
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
                                className="flex justify-between items-center w-full h-12 gap-x-1.5 rounded-lg bg-white px-2 py-2 text-gray-900 box-shadow-yellow-static border-1 border-black transition ease-in-out duration-200 hover:shadow-non outline-none text-sm cursor-pointer"
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
                                className="flex justify-between items-center w-full h-12 gap-x-1.5 rounded-lg bg-white px-2 py-2 text-gray-900 box-shadow-yellow-static border-1 border-black transition ease-in-out duration-200 hover:shadow-non outline-none text-sm cursor-pointer"
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
                                className="flex justify-between items-center w-full h-12 gap-x-1.5 rounded-lg bg-white px-2 py-2 text-gray-900 box-shadow-yellow-static border-1 border-black transition ease-in-out duration-200 hover:shadow-non outline-none text-sm cursor-pointer"
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
                                className="flex justify-between items-center w-full h-12 gap-x-1.5 rounded-lg bg-white px-2 py-2 text-gray-900 box-shadow-yellow-static border-1 border-black transition ease-in-out duration-200 hover:shadow-non outline-none text-sm cursor-pointer"
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
                                className="flex justify-between items-center w-full h-12 gap-x-1.5 rounded-lg bg-white px-2 py-2 text-gray-900 box-shadow-yellow-static border-1 border-black transition ease-in-out duration-200 hover:shadow-none outline-none text-sm"
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
                                className="flex justify-between items-center w-full h-12 gap-x-1.5 rounded-lg bg-white px-2 py-2 text-gray-900 box-shadow-yellow-static border-1 border-black transition ease-in-out duration-200 hover:shadow-non outline-none text-sm cursor-pointer"
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
                                className="flex justify-between items-center w-full h-12 gap-x-1.5 rounded-lg bg-white px-2 py-2 text-gray-900 box-shadow-yellow-static border-1 border-black transition ease-in-out duration-200 hover:shadow-non outline-none text-sm cursor-pointer"
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
                                className="flex justify-between items-center w-full h-12 gap-x-1.5 rounded-lg bg-white px-2 py-2 text-gray-900 box-shadow-yellow-static border-1 border-black transition ease-in-out duration-200 hover:shadow-non outline-none text-sm cursor-pointer"
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
                                className="flex justify-between items-center w-full h-12 gap-x-1.5 rounded-lg bg-white px-2 py-2 text-gray-900 box-shadow border-1 border-black transition ease-in-out duration-200 hover:shadow-non outline-none text-sm cursor-pointer"
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
                    {/* <div className="relative w-[420px] text-base gap-x-1.5 rounded-3xl bg-gray-200 p-7 pt-14 text-gray-900 cursor-pointer"> */}
                    {/* <div className="h-[100px] w-[60px] bg-black absolute -top-[70px] left-0 right-0 mx-auto"></div> */}
                    <div className="relative rounded-2xl h-full p-10 w-[500px] border-1">
                        <div className="bg-[url('https://camo.githubusercontent.com/cba518ead87b032dc6f1cbfc7fade27604449201ac1baf34d889f77f093f01ac/68747470733a2f2f7765622e77686174736170702e636f6d2f696d672f62672d636861742d74696c652d6461726b5f61346265353132653731393562366237333364393131306234303866303735642e706e67')] bg-contain h-full w-full absolute top-0 left-0 invert-[20%]"></div>
                        <div className="relative h-full bg-white flex flex-col items-center gap-6 p-6 rounded-2xl border-1">
                            <div className="relative h-[160px] w-[160px]">
                                <Image
                                    src={url}
                                    alt="avatar-1"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <div className="flex flex-col items-center gap-6 w-full">
                                <span className="text-4xl font-extrabold mb-3">
                                    {firstName !== "Choose First Name"
                                        ? capitalizeFirstLetter(firstName)
                                        : "Black"}
                                    {lastName !== "Choose Last Name"
                                        ? capitalizeFirstLetter(lastName)
                                        : "Bear"}
                                </span>
                                <div className="flex flex-col gap-2 w-full">
                                    <div className="flex justify-between">
                                        <span className="font-medium text-lg">
                                            Enrollment No:
                                        </span>
                                        <span className="text-right text-lg">
                                            {userDetails.enrollmentNo?.toUpperCase()}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-medium text-lg">
                                            College Name:
                                        </span>
                                        <span className="text-right text-lg">
                                            {userDetails.collegeName}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* </div> */}
                </div>
            </div>

            <Button
                bgColor="bg-[#fdd800]"
                textColor="#000000"
                type="submit"
                className=""
                onClick={handleCreateProfile}
            >
                Enter
            </Button>
        </div>
    );
}

export default CreateAvatar;