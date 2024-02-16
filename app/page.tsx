"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
    const router = useRouter();

    // Redirect to "/home" when the component mounts
    useEffect(() => {
        router.push("/home");
    }, [router]);

    return (
        <>
            <h1>College Khabar</h1>
            <div className="homepage-pattern w-[400px] p-8"></div>
        </>
    );
}
