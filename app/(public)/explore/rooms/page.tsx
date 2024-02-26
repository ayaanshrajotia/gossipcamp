import RoomBoxBigger from "@/app/components/room-boxes/RoomBoxBigger";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";

function page() {
    return (
        <div className="my-4 flex flex-col gap-7">
            <RoomBoxBigger
                roomName="Harry Potter"
                roomId="harrypotter"
                bgColor="bg-college-yellow"
                textColor="black"
                className="box-shadow-yellow"
                isPrivate={false}
            />
            <RoomBoxBigger
                roomName="Harry Potter"
                roomId="harrypotter"
                bgColor="bg-college-yellow"
                textColor="black"
                className="box-shadow-yellow"
                isPrivate={false}
            />
            <RoomBoxBigger
                roomName="Harry Potter"
                roomId="harrypotter"
                bgColor="bg-college-yellow"
                textColor="black"
                className="box-shadow-yellow"
                isPrivate={false}
            />
            <RoomBoxBigger
                roomName="Harry Potter"
                roomId="harrypotter"
                bgColor="bg-college-yellow"
                textColor="black"
                className="box-shadow-yellow"
                isPrivate={false}
            />
            <RoomBoxBigger
                roomName="Harry Potter"
                roomId="harrypotter"
                bgColor="bg-college-yellow"
                textColor="black"
                className="box-shadow-yellow"
                isPrivate={false}
            />
            <RoomBoxBigger
                roomName="Harry Potter"
                roomId="harrypotter"
                bgColor="bg-college-yellow"
                textColor="black"
                className="box-shadow-yellow"
                isPrivate={false}
            />
        </div>
    );
}

export default page;
