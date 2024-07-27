import { getSingleUserRooms } from "@/lib/slices/userSlice";
import { AppDispatch, RootState } from "@/lib/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RoomBoxBigger from "../room-boxes/RoomBoxBigger";
import { capitalizeFirstLetter } from "@/app/utils/helper";
import { useTheme } from "next-themes";

function Rooms({ username }: { username: string }) {
    const { theme } = useTheme();
    const dispatch = useDispatch<AppDispatch>();
    const { rooms, roomsLoading } = useSelector(
        (state: RootState) => state.users
    );

    useEffect(() => {
        dispatch(getSingleUserRooms(username.toString()));
    }, []);

    return (
        <div className="flex flex-col gap-6">
            {rooms?.map((room) => (
                <RoomBoxBigger
                    key={room?._id}
                    roomId={room?._id}
                    roomName={room?.roomName}
                    roomType={room?.roomType}
                    roomUsername={
                        room?.roomUsername
                            ? room?.roomUsername
                            : capitalizeFirstLetter(room?.adminProfile.fName) +
                              capitalizeFirstLetter(room?.adminProfile.lName)
                    }
                    roomDP={room?.roomDP}
                    roomDescription={room?.description}
                    bgcolor="bg-college-yellow"
                    textColor="black"
                    className={
                        theme === "dark"
                            ? "box-shadow-static-dark"
                            : "box-shadow-static"
                    }
                    isPrivate={room?.roomType === "College"}
                    totalParticipants={room?.participantsCount}
                />
            ))}
        </div>
    );
}

export default Rooms;
