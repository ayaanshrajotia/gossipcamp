"use client";
import { collegesOptions } from "@/app/utils/customOptions";
import Button from "@/app/components/Button";
import Dropdown from "@/app/components/Dropdown";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { signupUser } from "@/lib/slices/authSlice";
import { capitalizeFirstLetter } from "@/app/utils/helper";
import { useTheme } from "next-themes";

const schema = z.object({
    password: z
        .string()
        .min(8, "Password must contain at least 8 character(s)"),
    email: z.string().email("Please enter a valid email address"),
});

type FormFields = z.infer<typeof schema>;

export default function SignupPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [college, setCollege] = useState("");
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const { loading, error } = useSelector((state: RootState) => state.auth);
    const { theme } = useTheme();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormFields>({ resolver: zodResolver(schema) });

    const handleOptions = (data: string) => {
        setCollege(data);
    };

    // Signup handler
    const signup: SubmitHandler<FormFields> = async (data) => {
        try {
            setIsLoading(true);
            // Signup user
            try {
                if (college === "Choose Your College") {
                    toast.error("Please select the college");
                    return;
                }
                const response = await dispatch(
                    signupUser({
                        password: data.password,
                        email: data.email,
                        collegeName: college,
                    })
                );

                if (response.meta.requestStatus === "rejected")
                    throw new Error(response.payload);

                toast.success("Signed up successfully");
                router.push("/home");
            } catch (error: any) {
                toast.error(error.message);
                console.log(error);
            }

            setIsLoading(false);
        } catch (err) {
            console.error(err);
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-[450px] w-full flex flex-col font-secondary">
            <h1 className="font-primary font-bold text-4xl text-college-grey mb-8 dark:text-college-dark-white">
                Signup Anonymously!
            </h1>
            {/* Form Content */}
            <form
                className="flex flex-col gap-8"
                onSubmit={handleSubmit(signup)}
            >
                {/* Enrollment No Section */}
                <div className="flex flex-col gap-6">
                    <div
                        className={`${
                            theme === "dark"
                                ? "input-group-dark"
                                : "input-group"
                        }`}
                    >
                        <input
                            {...register("email")}
                            type="email"
                            id="email"
                            className={`w-full h-12 mt-1 border-1 rounded-lg border-black p-3 text-lg font-secondary outline-none dark:bg-college-dark-gray-3 dark:border-college-dark-gray-2 ${
                                theme === "dark"
                                    ? "box-shadow-dark"
                                    : "box-shadow "
                            }`}
                            required
                            autoComplete="false"
                        />
                        <label htmlFor="email">Email</label>
                        {errors.email && (
                            <div className="text-red-600 font-medium text-sm mt-2">
                                {errors.email.message}
                            </div>
                        )}
                    </div>

                    <select
                        name=""
                        id=""
                        className={`flex justify-between items-center text-base w-full h-12 gap-x-1.5 rounded-lg bg-white px-2 py-2 font-semibold text-gray-900 border-1 border-black transition ease-in-out duration-200 hover:shadow-non outline-none dark:text-college-dark-white dark:bg-college-dark-gray-3 dark:border-college-dark-gray-2 ${
                            theme === "dark" ? "box-shadow-dark" : "box-shadow "
                        }`}
                        onChange={(e) => handleOptions(e.target.value)}
                    >
                        {collegesOptions?.slice(0, 1).map((item) => (
                            <option
                                key={item.id}
                                value={item.name}
                                // disabled={true}
                                defaultValue={item.name}
                            >
                                {capitalizeFirstLetter(item.name)}
                            </option>
                        ))}
                        {collegesOptions?.slice(1).map((item) => (
                            <option key={item.id} value={item.name}>
                                {capitalizeFirstLetter(item.name)}
                            </option>
                        ))}
                    </select>
                    {/* Password */}
                    <div
                        className={`${
                            theme === "dark"
                                ? "input-group-dark"
                                : "input-group"
                        }`}
                    >
                        <input
                            {...register("password")}
                            id="password"
                            type={showPassword ? "text" : "password"}
                            className={`border-1 font-secondary mt-1 h-12 w-full rounded-lg border-black p-3 text-lg outline-none dark:bg-college-dark-gray-3 dark:border-college-dark-gray-2 ${
                                theme === "dark"
                                    ? "box-shadow-dark"
                                    : "box-shadow "
                            }`}
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
                </div>
                {/* OTP Section */}
                <div className="flex flex-col gap-6">
                    <Button
                        bgcolor="bg-[#ffdd00]"
                        textColor="text-black"
                        disabled={loading}
                        type="submit"
                    >
                        {loading ? "Signing..." : " Next → "}
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
