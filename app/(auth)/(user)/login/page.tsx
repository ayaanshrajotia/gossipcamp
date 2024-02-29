"use client";

import Button from "@/app/components/Button";
import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";

// icons
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { loginUser } from "@/lib/slices/authSlice";

const schema = z.object({
    userId: z.string(),
    // .refine((value) => value.length === 10, {
    //     message: "Mobile number must be exactly 10 digits long",
    // })
    // .transform((value) => parseInt(value)),
    password: z.string(),
    // .min(8, "Password must contain at least 8 character(s)"),
});

type FormFields = z.infer<typeof schema>;

const LoginPage = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    // const [loading, setLoading] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const { loading, user } = useSelector((state: RootState) => state.auth);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormFields>({ resolver: zodResolver(schema) });

    // Login Function
    const login: SubmitHandler<FormFields> = async (data) => {
        try {
            const response = await dispatch(loginUser(data));
            if (response.meta.requestStatus === "rejected")
                throw new Error(response.payload);

            toast.success("Logged in successfully");
            router.push("/home");
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    return (
        <div className="max-w-[400px] w-full flex flex-col font-secondary">
            <h1 className="font-primary font-bold text-4xl text-college-grey mb-8">
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
                        {...register("userId")}
                        type="text"
                        id="userId"
                        className="w-full h-12 mt-1 border-1 rounded-lg border-black p-3 text-lg font-secondary box-shadow outline-none"
                        required
                        autoComplete="false"
                    />
                    <label htmlFor="userId">Enrollment or Username</label>
                    {errors.userId && (
                        <div className="text-red-600 font-medium text-sm mt-2">
                            {errors.userId.message}
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
                            Forgot Password?
                        </span>
                    </Link>
                </div>
                <Button
                    bgcolor="bg-[#fdd800]"
                    textColor="#000000"
                    type="submit"
                    disabled={isSubmitting}
                >
                    {loading ? "Logging in..." : " Login → "}
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
};

export default LoginPage;
