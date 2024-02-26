"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
    const router = useRouter();

    // Redirect to "/home" when the component mounts
    useEffect(() => {
        router.push("/home");
    }, [router]);

    return <></>;
}
