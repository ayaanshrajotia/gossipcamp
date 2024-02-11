"use client";

import { colleges } from "@/app/lib/customOptions";
import Button from "@/app/ui/Button";
import Dropdown from "@/app/ui/Dropdown";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import OTPInput from "react-otp-input";
import { z } from "zod";

const schema = z.object({
    mobileNumber: z
        .string()
        .refine((value) => value.length === 10, {
            message: "Mobile number must be exactly 10 digits long",
        })
        .transform((value) => parseInt(value)),
    password: z
        .string()
        .min(8, "Password must contain at least 8 character(s)"),
    enrollmentNumber: z
        .string()
        .min(8, "Enrollment number must contain at least 4 character(s)"),
});

type FormFields = z.infer<typeof schema>;

export default function SignupPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [otp, setOtp] = useState("");
    const [college, setCollege] = useState("Select College");
    console.log(college);
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormFields>({ resolver: zodResolver(schema) });

    //
    const handleOptions = (data: string) => {
        setCollege(data);
    };

    // Signup handler
    const signup: SubmitHandler<FormFields> = async (data) => {
        router.push("/create-avatar");
        console.log(data);
    };

    return (
        <div className="max-w-[450px] w-full flex flex-col font-secondary">
            <h1 className="font-primary font-extrabold text-4xl text-college-grey mb-8">
                Signup Anonymously!
            </h1>
            {/* Form Content */}
            <form
                className="flex flex-col gap-8"
                onSubmit={handleSubmit(signup)}
            >
                {/* Mobile Number Section */}
                <div className="flex flex-col gap-6">
                    <div className="w-full flex items-center gap-4">
                        <div className="border-1 h-12 w-16 flex items-center justify-center rounded-lg border-black box-shadow">
                            <span className="font-bold font-secondary">
                                +91
                            </span>
                        </div>
                        <div className="input-group w-full">
                            <input
                                {...register("mobileNumber")}
                                id="mobileNumber"
                                type="text"
                                className="w-full h-12 mt-1 border-1 rounded-lg border-black p-3 text-lg font-secondary box-shadow outline-none"
                                required
                                autoComplete="false"
                            />
                            <label htmlFor="mobileNumber">Mobile Number</label>
                            {errors.mobileNumber && (
                                <div className="text-red-600 font-medium text-sm mt-2">
                                    {errors.mobileNumber.message}
                                </div>
                            )}
                        </div>
                    </div>
                    {/* Password */}
                    <div className="input-group">
                        <input
                            {...register("password")}
                            id="password"
                            type={showPassword ? "text" : "password"}
                            className="w-full h-12 mt-1 border-1 rounded-lg border-black p-3 text-lg font-secondary box-shadow outline-none"
                            required
                        />
                        <label htmlFor="password">Password</label>
                        {errors.password && (
                            <div className="text-red-600 font-medium text-sm mt-2">
                                {errors.password.message}
                            </div>
                        )}
                        {showPassword ? (
                            <EyeSlashIcon
                                className="cursor-pointer h-5 w-5 absolute right-3 top-[18px]"
                                onClick={() => setShowPassword(false)}
                            />
                        ) : (
                            <EyeIcon
                                className="cursor-pointer h-5 w-5 absolute right-3 top-[18px]"
                                onClick={() => setShowPassword(true)}
                            />
                        )}
                    </div>
                    <div className="input-group w-full">
                        <input
                            {...register("enrollmentNumber")}
                            type="text"
                            id="enrollmentNumber"
                            className="w-full h-12 mt-1 border-1 rounded-lg border-black p-3 text-lg font-secondary box-shadow outline-none"
                            required
                            autoComplete="false"
                        />
                        <label htmlFor="enrollmentNumber">
                            Enrollment Number
                        </label>
                        {errors.enrollmentNumber && (
                            <div className="text-red-600 font-medium text-sm mt-2">
                                {errors.enrollmentNumber.message}
                            </div>
                        )}
                    </div>

                    <Dropdown
                        handleOptions={handleOptions}
                        options={colleges}
                    />
                    <Button
                        bgColor="#fdd800"
                        textColor="text-college-gray"
                        type="button"
                    >
                        Get OTP
                    </Button>
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
                        bgColor="#313236"
                        textColor="text-white"
                        disabled={isSubmitting}
                        onClick={() => router.push("/create-avatar")}
                        type="submit"
                    >
                        {isSubmitting ? "Logging..." : " Next → "}
                    </Button>
                </div>
            </form>
            <span className="mt-4 text-center">
                Already have an account?{" "}
                <Link href={"/login"}>
                    <b>Login</b>
                </Link>
            </span>
        </div>
    );
}
