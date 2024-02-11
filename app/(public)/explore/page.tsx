import RoomBoxBigger from "@/app/ui/room-boxes/RoomBoxBigger";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";

function page() {
  return (
    <div className="min-h-screen">
      <div className="border-b-1 sticky top-0 z-[999] flex h-[70px] w-full items-center gap-4 border-black bg-white px-4 dark:bg-slate-900">
        <h1 className="font-secondary text-2xl font-extrabold">Explore</h1>
      </div>
      <div className="p-6">
        <div className="border-1 font-secondary box-shadow-yellow mt-1 flex h-12 w-full items-center rounded-xl border-black bg-white p-3 text-lg">
          <MagnifyingGlassIcon className="h-7 w-7" />
          <input type="text" className="mx-3 h-10 w-full outline-none" />
        </div>
        <div className="py-5">
          <ul className="flex justify-evenly">
            <li className="border-1 cursor-pointer rounded-2xl border-black bg-white p-1 px-4 font-semibold transition-all hover:bg-black hover:text-white">
              <Link href="/explore/people">People</Link>
            </li>
            <li className="border-1 cursor-pointer rounded-2xl border-black bg-white p-1 px-4 font-semibold transition-all hover:bg-black hover:text-white">
              <Link href="/explore/rooms">Rooms</Link>
            </li>
            <li className="border-1 cursor-pointer rounded-2xl border-black bg-white p-1 px-4 font-semibold transition-all hover:bg-black hover:text-white">
              <Link href="/explore/colleges">Colleges</Link>
            </li>
            <li className="border-1 cursor-pointer rounded-2xl border-black bg-white p-1 px-4 font-semibold transition-all hover:bg-black hover:text-white">
              <Link href="/explore/posts">Posts</Link>
            </li>
          </ul>
        </div>
        <div className="mt-4 flex flex-col gap-7">
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
      </div>
    </div>
  );
}

export default page;
