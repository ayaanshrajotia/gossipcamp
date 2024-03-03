"use client";

import Button from "@/app/components/Button";
import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
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
    password: z
        .string()
        .min(8, "Password must contain at least 8 character(s)"),
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
        <div className="font-secondary flex w-full max-w-[400px] flex-col">
            <h1 className="font-secondary text-college-grey mb-8 text-4xl font-extrabold">
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
                        className="border-1 font-secondary box-shadow mt-1 h-12 w-full rounded-lg border-black p-3 text-lg outline-none"
                        required
                        autoComplete="false"
                    />
                    <label htmlFor="userId">Enrollment or Username</label>
                    {errors.userId && (
                        <div className="mt-2 text-sm font-medium text-red-600">
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
                        className="border-1 font-secondary box-shadow mt-1 h-12 w-full rounded-lg border-black p-3 text-lg outline-none"
                        required
                    />
                    <label htmlFor="password">Password</label>
                    {errors.password && (
                        <div className="mt-2 text-sm font-medium text-red-600">
                            {errors.password.message}
                        </div>
                    )}
                    {showPassword ? (
                        <EyeSlashIcon
                            className="absolute right-3 top-[18px] h-5 w-5 cursor-pointer"
                            onClick={() => setShowPassword(false)}
                        />
                    ) : (
                        <EyeIcon
                            className="absolute right-3 top-[18px] h-5 w-5 cursor-pointer"
                            onClick={() => setShowPassword(true)}
                        />
                    )}
                </div>
                <div className="flex justify-between">
                    <span className="text-college-grey flex items-center gap-1 text-sm">
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
