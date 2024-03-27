"use client";
import Button from "@/app/components/Button";
import Image from "next/image";
import { useLayoutEffect, useState } from "react";
import {
    accessoriesTypeOptions,
    clotheColorOptions,
    clotheTypeOptions,
    eyeTypeOptions,
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
import { createAvatar } from "@/lib/slices/authSlice";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { useTheme } from "next-themes";

function CreateAvatar() {
    const [firstName, setFirstName] = useState("Choose First Name");
    const [lastName, setLastName] = useState("Choose Last Name");
    const [userDetails, setUserDetails] = useState<any>({});
    const [avatarParams, setAvatarParams] = useState({
        avatarStyle: "Circle",
        topType: "LongHairStraight",
        accessoriesType: "Blank",
        hairColor: "BrownDark",
        facialHairColor: "Auburn",
        facialHairType: "Blank",
        clotheType: "BlazerShirt",
        clotheColor: "Black",
        eyeType: "Default",
        eyebrowType: "Default",
        mouthType: "Default",
        skinColor: "Light",
    });
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const { user, loading } = useSelector(
        (state: RootState) => state.auth || ""
    );
    const { theme } = useTheme();

    const getRandomIndex = (length: number) => {
        return Math.floor(Math.random() * length);
    };

    const getRandomNames = () => {
        const randomFirstNameIndex = getRandomIndex(firstNames.length);
        const randomLastNameIndex = getRandomIndex(lastNames.length);
        const randomFirstName = firstNames[randomFirstNameIndex];
        const randomLastName = lastNames[randomLastNameIndex];

        setFirstName(randomFirstName.name);
        setLastName(randomLastName.name);
    };

    const getRandomAvatarParams = () => {
        const randomTopTypeIndex = getRandomIndex(topTypeOptions.length);
        const randomHairColorIndex = getRandomIndex(hairColorOptions.length);
        const randomAccessoriesTypeIndex = getRandomIndex(
            accessoriesTypeOptions.length
        );
        const randomSkinColorIndex = getRandomIndex(skinColorOptions.length);
        const randomFacialHairTypeIndex = getRandomIndex(
            facialHairTypeOptions.length
        );
        const randomFacialHairColorIndex = getRandomIndex(
            facialHairColorOptions.length
        );
        const randomClotheTypeIndex = getRandomIndex(clotheTypeOptions.length);
        const randomClotheColorIndex = getRandomIndex(
            clotheColorOptions.length
        );
        const randomEyeTypeIndex = getRandomIndex(eyeTypeOptions.length);
        const randomMouthTypeIndex = getRandomIndex(mouthTypeOptions.length);

        setAvatarParams((prev) => ({
            ...prev,
            topType: topTypeOptions[randomTopTypeIndex].name,
            hairColor: hairColorOptions[randomHairColorIndex].name,
            accessoriesType:
                accessoriesTypeOptions[randomAccessoriesTypeIndex].name,
            skinColor: skinColorOptions[randomSkinColorIndex].name,
            facialHairType:
                facialHairTypeOptions[randomFacialHairTypeIndex].name,
            facialHairColor:
                facialHairColorOptions[randomFacialHairColorIndex].name,
            clotheType: clotheTypeOptions[randomClotheTypeIndex].name,
            clotheColor: clotheColorOptions[randomClotheColorIndex].name,
            eyeType: eyeTypeOptions[randomEyeTypeIndex].name,
            mouthType: mouthTypeOptions[randomMouthTypeIndex].name,
        }));
    };

    useLayoutEffect(() => {
        setUserDetails(user);
    }, [userDetails]);

    const url = `https://avataaars.io/?avatarStyle=Circle&${avatarParams.accessoriesType}&topType=${avatarParams.topType}&accessoriesType=${avatarParams.accessoriesType}&hairColor=${avatarParams.hairColor}&facialHairType=${avatarParams.facialHairType}&clotheType=${avatarParams.clotheType}&eyebrowType=${avatarParams.eyebrowType}&mouthType=${avatarParams.mouthType}&skinColor=${avatarParams.skinColor}&eyeType=${avatarParams.eyeType}&facialHairColor=${avatarParams.facialHairColor}&clotheColor=${avatarParams.clotheColor}`;

    const handleCreateProfile = async () => {
        try {
            if (
                firstName === "Choose First Name" ||
                lastName === "Choose Last Name"
            ) {
                toast.error("Please select your name");
                return;
            }
            const response = await dispatch(
                createAvatar({
                    fName: firstName,
                    lName: lastName,
                    avatarUrl: url,
                })
            );
            if (response.meta.requestStatus === "fulfilled") {
                router.push("/home");
                toast.success("Welcome to GossipCamp");
            } else throw new Error(response.payload);
        } catch (error: any) {
            console.log(error);
            toast.error(error.message);
        }
    };

    return (
        <div className="w-[1200px] flex flex-col gap-10 items-center font-secondary">
            <h1 className="font-secondary font-bold text-5xl text-college-grey dark:text-college-dark-white">
                Create your Avatar!
            </h1>
            <div className="flex w-full gap-14 max-[800px]:flex-col-reverse">
                {/* Left Side */}
                <div className="min-[800px]:w-1/2 flex flex-col gap-5">
                    <div className="flex flex-col gap-1 ">
                        <span className="font-semibold ">Name</span>
                        <div className="flex gap-6">
                            <select
                                name=""
                                id=""
                                className={`flex justify-between items-center text-base w-full h-12 gap-x-1.5 rounded-lg bg-white px-2 py-2 font-semibold text-gray-900 border-1 border-black transition ease-in-out duration-200 hover:shadow-non outline-none dark:text-college-dark-white dark:bg-college-dark-gray-3 dark:border-college-dark-gray-2 ${
                                    theme === "dark"
                                        ? "box-shadow-dark"
                                        : "box-shadow"
                                }`}
                                onChange={(e) => setFirstName(e.target.value)}
                            >
                                {firstNames?.slice(0, 1).map((item) => (
                                    <option
                                        key={item.id}
                                        value={""}
                                        defaultChecked
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
                                className={`flex justify-between items-center text-base w-full h-12 gap-x-1.5 rounded-lg bg-white px-2 py-2 font-semibold text-gray-900 border-1 border-black transition ease-in-out duration-200 hover:shadow-non outline-none dark:text-college-dark-white dark:bg-college-dark-gray-3 dark:border-college-dark-gray-2 ${
                                    theme === "dark"
                                        ? "box-shadow-dark"
                                        : "box-shadow"
                                }`}
                                onChange={(e) => setLastName(e.target.value)}
                            >
                                {lastNames?.slice(0, 1).map((item) => (
                                    <option
                                        key={item.id}
                                        value={""}
                                        defaultChecked
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
                            Hair Type and Hair Color
                        </span>
                        <div className="flex gap-6">
                            <select
                                name=""
                                id=""
                                className={`flex justify-between items-center text-base w-full h-12 gap-x-1.5 rounded-lg bg-white px-2 py-2 font-semibold text-gray-900 border-1 border-black transition ease-in-out duration-200 hover:shadow-non outline-none dark:text-college-dark-white dark:bg-college-dark-gray-3 dark:border-college-dark-gray-2 ${
                                    theme === "dark"
                                        ? "box-shadow-dark"
                                        : "box-shadow"
                                }`}
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
                                className={`flex justify-between items-center text-base w-full h-12 gap-x-1.5 rounded-lg bg-white px-2 py-2 font-semibold text-gray-900 border-1 border-black transition ease-in-out duration-200 hover:shadow-non outline-none dark:text-college-dark-white dark:bg-college-dark-gray-3 dark:border-college-dark-gray-2 ${
                                    theme === "dark"
                                        ? "box-shadow-dark"
                                        : "box-shadow"
                                }`}
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
                                className={`flex justify-between items-center text-base w-full h-12 gap-x-1.5 rounded-lg bg-white px-2 py-2 font-semibold text-gray-900 border-1 border-black transition ease-in-out duration-200 hover:shadow-non outline-none dark:text-college-dark-white dark:bg-college-dark-gray-3 dark:border-college-dark-gray-2 ${
                                    theme === "dark"
                                        ? "box-shadow-dark"
                                        : "box-shadow"
                                }`}
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
                                className={`flex justify-between items-center text-base w-full h-12 gap-x-1.5 rounded-lg bg-white px-2 py-2 font-semibold text-gray-900 border-1 border-black transition ease-in-out duration-200 hover:shadow-non outline-none dark:text-college-dark-white dark:bg-college-dark-gray-3 dark:border-college-dark-gray-2 ${
                                    theme === "dark"
                                        ? "box-shadow-dark"
                                        : "box-shadow"
                                }`}
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
                            Facial Hair Type & Facial Hair Color
                        </span>
                        <div className="flex gap-6">
                            <select
                                name=""
                                id=""
                                className={`flex justify-between items-center text-base w-full h-12 gap-x-1.5 rounded-lg bg-white px-2 py-2 font-semibold text-gray-900 border-1 border-black transition ease-in-out duration-200 hover:shadow-non outline-none dark:text-college-dark-white dark:bg-college-dark-gray-3 dark:border-college-dark-gray-2 ${
                                    theme === "dark"
                                        ? "box-shadow-dark"
                                        : "box-shadow"
                                }`}
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
                                className={`flex justify-between items-center text-base w-full h-12 gap-x-1.5 rounded-lg bg-white px-2 py-2 font-semibold text-gray-900 border-1 border-black transition ease-in-out duration-200 hover:shadow-non outline-none dark:text-college-dark-white dark:bg-college-dark-gray-3 dark:border-college-dark-gray-2 ${
                                    theme === "dark"
                                        ? "box-shadow-dark"
                                        : "box-shadow"
                                }`}
                                onChange={(e) =>
                                    setAvatarParams((prev) => ({
                                        ...prev,
                                        facialHairColor: e.target.value,
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
                            Cloth Type & Cloth Color
                        </span>
                        <div className="flex gap-6">
                            <select
                                name=""
                                id=""
                                className={`flex justify-between items-center text-base w-full h-12 gap-x-1.5 rounded-lg bg-white px-2 py-2 font-semibold text-gray-900 border-1 border-black transition ease-in-out duration-200 hover:shadow-non outline-none dark:text-college-dark-white dark:bg-college-dark-gray-3 dark:border-college-dark-gray-2 ${
                                    theme === "dark"
                                        ? "box-shadow-dark"
                                        : "box-shadow"
                                }`}
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
                                className={`flex justify-between items-center text-base w-full h-12 gap-x-1.5 rounded-lg bg-white px-2 py-2 font-semibold text-gray-900 border-1 border-black transition ease-in-out duration-200 hover:shadow-non outline-none dark:text-college-dark-white dark:bg-college-dark-gray-3 dark:border-college-dark-gray-2 ${
                                    theme === "dark"
                                        ? "box-shadow-dark"
                                        : "box-shadow"
                                }`}
                                onChange={(e) =>
                                    setAvatarParams((prev) => ({
                                        ...prev,
                                        clotheColor: e.target.value,
                                    }))
                                }
                            >
                                {clotheColorOptions?.map((item) => (
                                    <option key={item.id} value={item.name}>
                                        {capitalizeFirstLetter(item.name)}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="font-semibold ">
                            Eye Type & Mouth Type
                        </span>
                        <div className="flex gap-6">
                            <select
                                name=""
                                id=""
                                className={`flex justify-between items-center text-base w-full h-12 gap-x-1.5 rounded-lg bg-white px-2 py-2 font-semibold text-gray-900 border-1 border-black transition ease-in-out duration-200 hover:shadow-non outline-none dark:text-college-dark-white dark:bg-college-dark-gray-3 dark:border-college-dark-gray-2 ${
                                    theme === "dark"
                                        ? "box-shadow-dark"
                                        : "box-shadow"
                                }`}
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
                            <select
                                name=""
                                id=""
                                className={`flex justify-between items-center text-base w-full h-12 gap-x-1.5 rounded-lg bg-white px-2 py-2 font-semibold text-gray-900 border-1 border-black transition ease-in-out duration-200 hover:shadow-non outline-none dark:text-college-dark-white dark:bg-college-dark-gray-3 dark:border-college-dark-gray-2 ${
                                    theme === "dark"
                                        ? "box-shadow-dark"
                                        : "box-shadow"
                                }`}
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
                <div className="min-[800px]:w-1/2  flex justify-end max-[800px]:justify-center">
                    <div className="relative rounded-2xl h-full p-10 w-full max-w-[500px] border-1 dark:border-college-dark-gray-3">
                        <div className="bg-[url('https://camo.githubusercontent.com/cba518ead87b032dc6f1cbfc7fade27604449201ac1baf34d889f77f093f01ac/68747470733a2f2f7765622e77686174736170702e636f6d2f696d672f62672d636861742d74696c652d6461726b5f61346265353132653731393562366237333364393131306234303866303735642e706e67')] bg-contain h-full w-full absolute top-0 left-0 invert-[20%]"></div>
                        {/* Details */}
                        <div className="relative h-full bg-white flex flex-col items-center gap-6 p-6 rounded-2xl border-1 dark:bg-college-dark-gray-3 dark:border-college-dark-gray-3">
                            <div className="relative w-full flex justify-center">
                                <div className="relative h-[160px] w-[160px] max-md:w-[120px] max-md:h-[120px]">
                                    <Image
                                        src={url}
                                        sizes="33vw"
                                        alt="avatar-1"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <ArrowPathIcon
                                    className="absolute my-auto -right-3 top-0 bottom-0 max-[400px]:w-6 max-[400px]:h-6 max-[400px]:p-1 w-8 h-8 bg-college-yellow stroke-black stroke-[2] rounded-full p-2 cursor-pointer"
                                    onClick={() => getRandomAvatarParams()}
                                />
                            </div>
                            <div className="flex flex-col items-center max-[400px]:gap-8 gap-6 w-full">
                                <div className="relative flex justify-center mb-3 w-full">
                                    <span className="text-3xl font-bold max-[800px]:text-xl">
                                        {firstName !== "Choose First Name"
                                            ? capitalizeFirstLetter(firstName)
                                            : "Black"}
                                        {lastName !== "Choose Last Name"
                                            ? capitalizeFirstLetter(lastName)
                                            : "Bear"}
                                    </span>
                                    <ArrowPathIcon
                                        className="absolute my-auto min-[400px]:-right-3 max-[400px]:top-[45px] top-0 bottom-0 max-[400px]:w-6 max-[400px]:h-6 max-[400px]:p-1 w-8 h-8 bg-college-yellow stroke-black stroke-[2] rounded-full p-2 cursor-pointer"
                                        onClick={() => getRandomNames()}
                                    />
                                </div>
                                <div className="flex flex-col gap-2 w-full">
                                    <div className="flex justify-between">
                                        <span className="font-bold text-lg mr-2">
                                            Email:
                                        </span>
                                        <span className="text-right text-lg">
                                            {userDetails?.email}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-bold text-lg">
                                            College Name:
                                        </span>
                                        <span className="text-right text-lg max-w-[200px]">
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
                bgcolor="bg-[#fdd800]"
                textColor="#000000"
                type="submit"
                className=""
                onClick={handleCreateProfile}
            >
                {loading ? "Entering..." : "Enter"}
            </Button>
        </div>
    );
}

export default CreateAvatar;
