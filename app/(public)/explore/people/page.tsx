import RoomBoxBigger from "@/app/components/room-boxes/RoomBoxBigger";
import UserBox from "@/app/components/user-boxes/UserBox";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";

function page() {
    return (
        <div className="mt-4 grid grid-cols-4 gap-6">
            <UserBox
                userName="Harry Potter"
                userId="harrypotter"
                bgColor="bg-college-yellow"
                textColor="black"
                className="box-shadow-yellow"
                isPrivate={false}
            />
            <UserBox
                userName="BurgerKingsasdasdasdasdasd"
                userId="harrypotter"
                bgColor="bg-college-yellow"
                textColor="black"
                className="box-shadow-yellow"
                isPrivate={false}
            />
            <UserBox
                userName="Harry Potter"
                userId="harrypotter"
                bgColor="bg-college-yellow"
                textColor="black"
                className="box-shadow-yellow"
                isPrivate={false}
            />
            <UserBox
                userName="Harry Potter"
                userId="harrypotter"
                bgColor="bg-college-yellow"
                textColor="black"
                className="box-shadow-yellow"
                isPrivate={false}
            />
            <UserBox
                userName="Harry Potter"
                userId="harrypotter"
                bgColor="bg-college-yellow"
                textColor="black"
                className="box-shadow-yellow"
                isPrivate={false}
            />
            <UserBox
                userName="Harry Potter"
                userId="harrypotter"
                bgColor="bg-college-yellow"
                textColor="black"
                className="box-shadow-yellow"
                isPrivate={false}
            />
            <UserBox
                userName="Harry Potter"
                userId="harrypotter"
                bgColor="bg-college-yellow"
                textColor="black"
                className="box-shadow-yellow"
                isPrivate={false}
            />
            <UserBox
                userName="Harry Potter"
                userId="harrypotter"
                bgColor="bg-college-yellow"
                textColor="black"
                className="box-shadow-yellow"
                isPrivate={false}
            />
        </div>
    );
}

export default page;
