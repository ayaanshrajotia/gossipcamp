"use client";

import Button from "@/app/ui/Button";
import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// icons
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

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
});

type FormFields = z.infer<typeof schema>;

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormFields>({ resolver: zodResolver(schema) });

    const login: SubmitHandler<FormFields> = async (data) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log(data);
    };

    return (
        <div className="max-w-[400px] w-full flex flex-col font-secondary">
            <h1 className="font-primary font-extrabold text-4xl text-college-grey mb-8">
                Login Anonymously!
            </h1>
            {/* Form Content */}
            <form
                className="flex flex-col gap-6"
                onSubmit={handleSubmit(login)}
                noValidate
            >
                {/* Mobile Number */}
                <div className="input-group">
                    <input
                        {...register("mobileNumber")}
                        type="text"
                        id="mobileNumber"
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
                <div className="flex justify-between">
                    <span className="text-college-grey flex gap-1 items-center text-sm">
                        Remember Me
                    </span>
                    <Link href={"#"}>
                        <span className="text-college-grey text-sm">
                            Forget Password?
                        </span>
                    </Link>
                </div>

                <Button
                    bgColor="#fdd800"
                    textColor="#000000"
                    type="submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Logging..." : "Login"}
                </Button>
            </form>
            <span className="mt-4 text-center">
                Not Registered?{" "}
                <Link href={"/signup"}>
                    <b>Signup</b>
                </Link>
            </span>
        </div>
    );
}
