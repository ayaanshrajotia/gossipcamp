import Button from "./ui/Button";

export default function Home() {
    return (
        <>
            <h1>College Khabar</h1>
            <div className="w-[400px] p-8">
                <Button
                    title={"Get OTP"}
                    bgColor="#fdd800"
                    textColor="#000000"
                />
            </div>
        </>
    );
}
