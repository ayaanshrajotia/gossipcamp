"use client";

import Button from "@/app/ui/Button";
import Dropdown from "@/app/ui/Dropdown";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import OTPInput from "react-otp-input";

export default function SignupPage() {
    const [otp, setOtp] = useState("");
    const router = useRouter();

    return (
        <div className="max-w-[450px] w-full flex flex-col gap-8">
            <h1 className="font-primary font-extrabold text-4xl text-college-grey">
                Signup Anonymously!
            </h1>
            {/* Form Content */}
            <div className="flex flex-col gap-12">
                {/* Mobile Number Section */}
                <div className="flex flex-col gap-6">
                    <div className="w-full flex items-center gap-4">
                        <input
                            type="text"
                            className="relative w-full h-12 border-1 rounded-lg border-black p-3 text-base font-secondary box-shadow outline-none"
                            placeholder="Enter enrollment no."
                        />
                        <input
                            type="text"
                            className="relative w-full h-12 border-1 rounded-lg border-black p-3 text-base font-secondary box-shadow outline-none"
                            placeholder="Enter mobile no."
                        />
                    </div>
                    <Dropdown title="Choose college" />
                    <Button
                        title="Get OTP"
                        bgColor="#fdd800"
                        textColor="#000000"
                    />
                </div>
                <div className="w-full h-[1px] bg-black"></div>
                {/* OTP Section */}
                <div className="flex flex-col gap-6">
                    <div className="">
                        <span className="text-sm">Enter OTP</span>
                        <OTPInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={4}
                            renderInput={(props) => <input {...props} />}
                            containerStyle={{
                                display: "flex",
                                justifyContent: "space-between",
                                width: "100%",
                                marginTop: "0.5rem",
                            }}
                            inputStyle={{
                                height: "3.5rem",
                                width: "3.5rem",
                                border: "1.5px black solid",
                                borderRadius: "0.5rem",
                                outline: "none",
                                boxShadow:
                                    "6px 6px 0px 0px rgba(221, 221, 221, 0.75)",
                            }}
                        />
                    </div>
                    <Button
                        title="Next →"
                        bgColor="#313236"
                        textColor="#ffffff"
                        onClickHandle={() => router.push("/signup/avatar")}
                    />
                    <span className="mt-4 text-center">
                        Already have an account?{" "}
                        <Link href={"/login"}>
                            <b>Login</b>
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    );
}
