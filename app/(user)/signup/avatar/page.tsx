import Button from "@/app/ui/Button";
import Dropdown from "@/app/ui/Dropdown";
import Image from "next/image";

function page() {
    return (
        <div className="max-w-[450px] w-full flex flex-col gap-8">
            <h1 className="font-primary font-extrabold text-4xl text-college-grey">
                Create your Avatar!
            </h1>
            <div className="flex flex-col gap-6">
                <div className="flex justify-between w-full gap-6">
                    <Dropdown title="Choose First Name" />
                    <Dropdown title="Choose Last Name" />
                </div>
                <Dropdown title="Choose Avatar" />
                <div className="flex items-center gap-6 justify-center my-8">
                    <Image
                        src={"/avatar-1.png"}
                        alt="avatar-1"
                        width={80}
                        height={80}
                        className="rounded-full"
                    />
                    <span className="text-4xl font-bold">DarkBear</span>
                </div>
                <Button
                    title="Enter   →"
                    bgColor="#fdd800"
                    textColor="#000000"
                />
            </div>
        </div>
    );
}

export default page;
