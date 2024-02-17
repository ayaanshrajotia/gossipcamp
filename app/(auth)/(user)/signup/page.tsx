"use client";
import { collegesOptions } from "@/app/utils/customOptions";
import auth from "@/app/utils/firebase";
import Button from "@/app/ui/Button";
import Dropdown from "@/app/ui/Dropdown";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    ConfirmationResult,
    RecaptchaVerifier,
    signInWithPhoneNumber,
} from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import OTPInput from "react-otp-input";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { signupUser } from "@/lib/slices/userSlice";

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
    const [isLoading, setIsLoading] = useState(false);
    const [otp, setOtp] = useState("");
    const [college, setCollege] = useState("");
    const router = useRouter();
    const [confirmationResult, setConfirmationResult] =
        useState<ConfirmationResult | null>(null);
    const [otpSent, setOtpSent] = useState(false);
    const [otpVerified, setOptVerified] = useState(false);
    const [mobileNumber, setMobileNumber] = useState("");
    const dispatch = useDispatch<AppDispatch>();
    const { loading, error } = useSelector((state: RootState) => state.user);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormFields>({ resolver: zodResolver(schema) });

    useEffect(() => {
        // @ts-ignore
        window.recaptchaVerifier = new RecaptchaVerifier(auth, "sign-in-otp", {
            size: "invisible",
            callback: (response: any) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                // handleOTP();
            },
        });
    }, []);

    const handleOTP = async () => {
        try {
            setIsLoading(true);
            // @ts-ignore
            const appVerifier = window.recaptchaVerifier;
            const phoneNumber = "+91" + mobileNumber;
            const confirmationResult = await signInWithPhoneNumber(
                auth,
                phoneNumber,
                appVerifier
            );

            setConfirmationResult(confirmationResult);
            setOtpSent(true);
            // @ts-ignore
            // window.recaptchaVerifier = null;
            toast.success("OTP Sent");
            setIsLoading(false);
        } catch (err) {
            console.error(err);
            toast.error("Too many requests, try again later.");
            setIsLoading(false);
        }
    };

    const confirmOTP = async () => {};

    const handleOptions = (data: string) => {
        setCollege(data);
    };

    // Signup handler
    const signup: SubmitHandler<FormFields> = async (data) => {
        try {
            setIsLoading(true);
            if (confirmationResult) {
                await confirmationResult.confirm(otp);
                setOptVerified(true);
            } else {
                toast.error("Erong OTP");
                return;
            }

            // Signup user
            try {
                const response = await dispatch(
                    signupUser({
                        mobileNo: data.mobileNumber,
                        password: data.password,
                        enrollmentNo: data.enrollmentNumber,
                        collegeName: college,
                    })
                );
                toast.success("Signed up successfully");
                console.log(response);
                setTimeout(() => {
                    router.push("/create-avatar");
                }, 1500);
            } catch (error: any) {
                toast.error(error);
            }

            setIsLoading(false);
        } catch (err) {
            console.error(err);
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-[450px] w-full flex flex-col font-secondary">
            <h1 className="font-primary font-extrabold text-4xl text-college-grey mb-8">
                Signup Anonymously!
            </h1>
            {!otpSent ? <div id="recaptcha-container"></div> : null}
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
                                onChange={(e) =>
                                    setMobileNumber(e.target.value)
                                }
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
                        options={collegesOptions}
                    />
                    <Button
                        bgColor="#fdd800"
                        textColor="text-college-gray"
                        type="button"
                        id="sign-in-otp"
                        onClick={handleOTP}
                    >
                        {loading ? "Fetching" : "Get OTP"}
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
                            numInputs={6}
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
