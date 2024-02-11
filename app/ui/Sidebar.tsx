import React from "react";
import Container from "./Container";
import RoomBox from "./room-boxes/RoomBox";
import Image from "next/image";

export default function Sidebar() {
    return (
        <div className="h-screen w-[320px] border-l-1 border-black fixed right-0 top-0 bg-white">
            <div className="h-[70px] flex items-center px-4">
                {/* Upper Div */}
                <div className="flex gap-2">
                    <div>
                        <div className="relative h-[45px] w-[45px]">
                            <Image
                                src="/avatar-1.png"
                                alt="avatar-1"
                                fill
                                className="object-cover rounded-full border-1 border-black"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-secondary font-bold text-base">
                            @BurgerEater
                        </span>
                        <span className="font-secondary text-gray-500 text-sm">
                            Profile
                        </span>
                    </div>
                </div>
            </div>
            <div className="flex flex-col h-full mt-4">
                {/* Upper Div */}
                <div className="flex flex-col gap-3 mx-4 h-[180px]">
                    <h1 className="text-xl font-bold font-secondary mx-3">
                        Private Rooms
                    </h1>
                    <div>
                        <RoomBox
                            roomName="LNCT Bhopal"
                            roomId="lnctbhopal"
                            bgColor="bg-college-yellow"
                            textColor="black"
                            isPrivate={true}
                            className="box-shadow-yellow"
                        />
                    </div>
                </div>
                {/* Lower Div */}
                <div className="flex flex-col h-[calc(100vh-270px)]">
                    <h1 className="text-xl font-bold font-secondary p-3 mx-3">
                        Public Rooms
                    </h1>
                    <div className="flex flex-col h-full gap-6 overflow-auto p-3">
                        <RoomBox
                            roomName="Harry Potter"
                            roomId="harrypotter"
                            bgColor="bg-college-yellow"
                            textColor="black"
                            className="box-shadow-yellow"
                            isPrivate={false}
                        />
                        <RoomBox
                            roomName="Game of Thrones"
                            roomId="gameofthrones"
                            bgColor="bg-college-yellow"
                            textColor="black"
                            className="box-shadow-yellow"
                            isPrivate={false}
                        />
                        <RoomBox
                            roomName="College Khabar"
                            roomId="collegekhabar"
                            bgColor="bg-college-yellow"
                            textColor="black"
                            className="box-shadow-yellow"
                            isPrivate={false}
                        />
                        <RoomBox
                            roomName="Friends"
                            roomId="friends"
                            bgColor="bg-college-yellow"
                            textColor="black"
                            className="box-shadow-yellow"
                            isPrivate={false}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

{
    /* <Container
                    bgColor="bg-college-yellow"
                    textColor="black"
                    className="box-shadow-yellow"
                >
                    sfsdf
                </Container> */
}
