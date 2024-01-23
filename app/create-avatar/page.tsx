"use client";

import Button from "@/app/ui/Button";
import Dropdown from "@/app/ui/Dropdown";
import Image from "next/image";
import { useState } from "react";
import { firstNames, lastNames } from "../lib/customOptions";
import { capitalizeFirstLetter } from "../lib/helper";

function CreateAvatar() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setlastName] = useState("");

    const handleFirstName = (data: string) => {
        setFirstName(data);
    };

    const handleLastName = (data: string) => {
        setlastName(data);
    };
    return (
        <div className="max-w-[450px] w-full flex flex-col gap-8">
            <h1 className="font-primary font-extrabold text-4xl text-college-grey">
                Create your Avatar!
            </h1>
            <div className="flex flex-col gap-6 items-center justify-center">
                <div className="flex justify-between w-full gap-6">
                    <Dropdown
                        title="Choose First Name"
                        handleOptions={handleFirstName}
                        options={firstNames}
                    />
                    <Dropdown
                        title="Choose Last Name"
                        handleOptions={handleLastName}
                        options={lastNames}
                    />
                </div>
                {/* <Dropdown title="Choose Avatar" handleOptions={} /> */}
                <div className="flex items-center gap-6 justify-center my-8">
                    <Image
                        src={"/avatar-1.png"}
                        alt="avatar-1"
                        width={80}
                        height={80}
                        className="rounded-full"
                    />
                    <span className="text-4xl font-bold">
                        {capitalizeFirstLetter(firstName)}
                        {capitalizeFirstLetter(lastName)}
                    </span>
                </div>
                <Button bgColor="#fdd800" textColor="#000000" type="submit">
                    Enter
                </Button>
            </div>
        </div>
    );
}

export default CreateAvatar;
