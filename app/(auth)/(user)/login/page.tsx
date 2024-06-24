"use client";

import Button from "@/app/components/Button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";

// icons
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { loginAsGuest, loginUser } from "@/lib/slices/authSlice";
import { useTheme } from "next-themes";

const schema = z.object({
    userId: z.string().refine((val) => {
        if (val.includes("@")) {
            return z.string().email("Please enter a valid email address");
        } else {
            return z
                .string()
                .min(3, "Username must contain at least 3 character(s)");
        }
    }),
    password: z
        .string()
        .min(8, "Password must contain at least 8 character(s)"),
});

type FormFields = z.infer<typeof schema>;

const LoginPage = () => {
    const router = useRouter();
    const { theme } = useTheme();
    const dispatch = useDispatch<AppDispatch>();
    const { loading, loadingGuest } = useSelector(
        (state: RootState) => state.auth
    );
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormFields>({ resolver: zodResolver(schema) });

    const [currentTheme, setCurrentTheme] = useState<string | undefined>(
        undefined
    );
    const [showPassword, setShowPassword] = useState(false);

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

    useEffect(() => {
        setCurrentTheme(theme);
    }, [theme]);

    const loginAsGuestHandler = async (e: any) => {
        e.preventDefault();
        try {
            const response = await dispatch(
                loginAsGuest({
                    userId: "guest1",
                    password: "guest1@111",
                })
            );
            if (response.meta.requestStatus === "rejected")
                throw new Error(response.payload);

            toast.success("Logged in successfully");
            router.push("/home");
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    return (
        <div className="font-secondary flex w-full max-w-[400px] flex-col dark:text-college-dark-white">
            <h1 className="font-secondary text-college-grey mb-8 text-4xl font-extrabold dark:text-college-dark-white ">
                Login Anonymously!
            </h1>
            {/* Form Content */}
            <form
                className="flex flex-col gap-6"
                onSubmit={handleSubmit(login)}
                noValidate
            >
                {/* Mobile Number */}
                <div
                    className={`${
                        currentTheme === "dark"
                            ? "input-group-dark"
                            : "input-group"
                    }`}
                >
                    <input
                        {...register("userId")}
                        type="text"
                        id="userId"
                        className={`border-1 font-secondary mt-1 h-12 w-full rounded-lg border-black p-3 text-lg outline-none dark:bg-college-dark-gray-3 dark:border-college-dark-gray-2 ${
                            currentTheme === "dark"
                                ? "box-shadow-dark"
                                : "box-shadow"
                        }`}
                        required
                        autoComplete="false"
                    />
                    <label
                        htmlFor="userId"
                        className="dark:text-college-dark-white"
                    >
                        Email or Username
                    </label>
                    {errors.userId && (
                        <div className="mt-2 text-sm font-medium text-red-600">
                            {errors.userId.message}
                        </div>
                    )}
                </div>
                {/* Password */}
                <div
                    className={`${
                        currentTheme === "dark"
                            ? "input-group-dark"
                            : "input-group"
                    }`}
                >
                    <input
                        {...register("password")}
                        id="password"
                        type={showPassword ? "text" : "password"}
                        className={`border-1 font-secondary mt-1 h-12 w-full rounded-lg border-black p-3 text-lg outline-none dark:bg-college-dark-gray-3 dark:border-college-dark-gray-2 ${
                            currentTheme === "dark"
                                ? "box-shadow-dark"
                                : "box-shadow "
                        }`}
                        required
                    />
                    <label
                        htmlFor="password"
                        className="dark:text-college-dark-white"
                    >
                        Password
                    </label>
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
                <div className="flex justify-between ">
                    <span className="text-college-grey flex items-center gap-1 text-sm dark:text-college-dark-white">
                        Remember Me
                    </span>
                    <Link href={"#"}>
                        <span className="text-college-grey text-sm dark:text-college-dark-white">
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
                <span className="text-center uppercase text-lg font-semibold">
                    or
                </span>
                <Button
                    bgcolor="bg-[#2e2e2e]"
                    textColor="#ffffff"
                    type="button"
                    disabled={isSubmitting}
                    onClick={(e: any) => loginAsGuestHandler(e)}
                >
                    {loadingGuest ? "Logging in..." : " Login as Guest → "}
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
