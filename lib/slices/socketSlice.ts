import { socket } from "@/app/StoreProvider";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { formatRevalidate } from "next/dist/server/lib/revalidate";
import toast from "react-hot-toast";

export const connectSocket = createAsyncThunk(
    "socket/connectSocket",
    async (_, { rejectWithValue }) => {
        await socket.connect();
    }
);

export const disconnectSocket = createAsyncThunk(
    "socket/disconnectSocket",
    async (_, { rejectWithValue }) => await socket.disconnect()
);

export const openRoom = createAsyncThunk(
    "socket/openRoom",
    async (data: any, { rejectWithValue }) => {
        console.log("emitted");
        socket.emit("open-room", data);
    }
);

export const welcomeMessageListener = createAsyncThunk(
    "socket/welcomeMessageListener",
    // i need to get dispatch here
    async (_, { rejectWithValue, dispatch }) => {
        let x;
        console.log("welcomeMessageListener");
        socket.on("welcome-user", (data: any) => {
            x = data;
            // dispatch()
        });
    }
);

export const joinRoomEmitter = createAsyncThunk(
    "socket/joinRoomEmitter",
    async (data: any, { rejectWithValue }) => {
        console.log("joinRoomEmitter");
        socket.emit("join-room", data);
    }
);

const initialState: {
    isConnected: boolean;
} = {
    isConnected: false,
};

const socketSlice = createSlice({
    name: "socket",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(connectSocket.fulfilled, (state) => {
                state.isConnected = true;
            })
            .addCase(disconnectSocket.rejected, (state) => {
                console.log("Socket is disconnected");
                state.isConnected = false;
            })
            .addCase(disconnectSocket.fulfilled, (state) => {
                console.log("Socket is disconnected");
                state.isConnected = false;
            })
            .addCase(welcomeMessageListener.fulfilled, (state, action) => {
                console.log(action.payload);
            });
    },
});

export const {} = socketSlice.actions;

export default socketSlice.reducer;