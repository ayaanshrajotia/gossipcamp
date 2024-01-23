import React from "react";
import Container from "./Container";

export default function Sidebar() {
    return (
        <header className="relative h-screen w-[330px] bg-slate-300 p-2 z-[-999]">
            <div className="p-4">
                <h1 className="text-2xl font-primary font-bold">
                    CollegeKhabar
                </h1>
            </div>
            <div className="p-4">
                <Container bgColor="bg-college-yellow" textColor="black">
                    sfsdf
                </Container>
            </div>
        </header>
    );
}
