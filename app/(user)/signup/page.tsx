import Button from "@/app/ui/Button";
import Link from "next/link";

export default function SignupPage() {
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
                            className="relative w-full h-12 border-1 rounded-lg border-black p-3 text-base font-secondary box-shadow"
                            placeholder="Enter enrollment no."
                        />
                        <input
                            type="text"
                            className="relative w-full h-12 border-1 rounded-lg border-black p-3 text-base font-secondary box-shadow"
                            placeholder="Enter mobile no."
                        />
                    </div>
                    <input
                        type="text"
                        className="relative w-full h-12 border-1 rounded-lg border-black p-3 text-base font-secondary box-shadow"
                        placeholder="Enter mobile no."
                    />
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
                        <div className="flex justify-between mt-1">
                            <input
                                type="text"
                                className="h-14 w-14 border-1 border-black rounded-lg text-2xl font-bold outline-none text-center box-shadow"
                                inputMode={"numeric"}
                                maxLength={1}
                            />
                            <input
                                type="text"
                                className="h-14 w-14 border-1 border-black rounded-lg text-2xl font-bold outline-none text-center box-shadow"
                                inputMode={"numeric"}
                                maxLength={1}
                            />
                            <input
                                type="text"
                                className="h-14 w-14 border-1 border-black rounded-lg text-2xl font-bold outline-none text-center box-shadow"
                                inputMode={"numeric"}
                                maxLength={1}
                            />
                            <input
                                type="text"
                                className="h-14 w-14 border-1 border-black rounded-lg text-2xl font-bold outline-none text-center box-shadow"
                                inputMode={"numeric"}
                                maxLength={1}
                            />
                        </div>
                    </div>
                    <Button
                        title="Next →"
                        bgColor="#313236"
                        textColor="#ffffff"
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
