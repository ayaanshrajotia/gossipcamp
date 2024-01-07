import Image from "next/image";

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-screen w-full flex flex-1 p-4">
            <div className="w-1/2 flex items-center justify-center">
                {children}
            </div>
            <div className="pattern-bg relative w-1/2 rounded-r-xl">
                <Image
                    src={"/login-1.png"}
                    alt="thought photo"
                    width={400}
                    height={0}
                    className="absolute top-10 right-0
                    "
                />
                <Image
                    src={"/login-2.png"}
                    alt="thought photo"
                    width={400}
                    height={0}
                    className="absolute bottom-32 left-0"
                />
                <Image
                    src={"/login-3.png"}
                    alt="thought photo"
                    width={400}
                    height={0}
                    className="absolute bottom-0 left-0"
                />
            </div>
        </div>
    );
}
