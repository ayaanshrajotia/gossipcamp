import Button from "@/app/ui/Button";

export default function LoginPage() {
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
                            className="relative w-full h-12 border-1 rounded-lg border-black p-3 text-lg font-secondary box-shadow"
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
                        title="Verify"
                        bgColor="#313236"
                        textColor="#ffffff"
                    />
                    <span className="mt-4 text-center">
                        Not Registered? <b>Signup</b>
                    </span>
                </div>
            </div>
        </div>
    );
}
