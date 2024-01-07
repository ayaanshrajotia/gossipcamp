"use client";

import Button from "@/app/ui/Button";
import Link from "next/link";
import { useState } from "react";
import OTPInput from "react-otp-input";

export default function LoginPage() {
    const [otp, setOtp] = useState("");
    return (
        <div className="max-w-[400px] w-full flex flex-col gap-8">
            <h1 className="font-primary font-extrabold text-4xl text-college-grey">
                Login Anonymously!
            </h1>
            {/* Form Content */}
            <div className="flex flex-col gap-10">
                {/* Mobile Number Section */}
                <div className="flex flex-col gap-6">
                    <div className="w-full flex items-center gap-4">
                        <div className="border-1 h-12 w-16 flex items-center justify-center rounded-lg border-black box-shadow">
                            <span className="font-bold font-secondary">
                                +91
                            </span>
                        </div>
                        <input
                            type="text"
                            className="relative w-full h-12 border-1 rounded-lg border-black p-3 text-lg font-secondary box-shadow outline-none"
                            placeholder="Enter mobile no."
                            maxLength={10}
                            inputMode={"numeric"}
                        />
                    </div>
                    <Button
                        title="Get OTP"
                        bgColor="#fdd800"
                        textColor="#000000"
                    />
                </div>
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
                                fontFamily: "Be Vietnam Pro",
                                fontSize: "1.4rem"
                            }}
                        />
                    </div>
                    <Button
                        title="Verify"
                        bgColor="#313236"
                        textColor="#ffffff"
                    />
                    <span className="mt-4 text-center">
                        Not Registered?{" "}
                        <Link href={"/signup"}>
                            <b>Signup</b>
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    );
}
