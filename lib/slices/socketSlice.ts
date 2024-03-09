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
        socket.on("welcome-user", (data: any) => {
            x = data;
            // dispatch()
        });
    }
);

export const joinRoomEmitter = createAsyncThunk(
    "socket/joinRoomEmitter",
    async (data: any, { rejectWithValue }) => {
        socket.emit("join-room", data);
    }
);

export const leaveRoomEmitter = createAsyncThunk(
    "socket/leaveRoomEmitter",
    async (data: any, { rejectWithValue }) => {
        socket.emit("leave-room", data);
    }
);

export const messageListener = createAsyncThunk(
    "socket/messageListener",
    async (_, { rejectWithValue, dispatch }) => {
        socket.on("message", (data: any) => {
            // dispatch(addMessage(data));
            console.log(data);
        });
    }
);

export const sendMessageEmitter = createAsyncThunk(
    "socket/sendMessageEmitter",
    async (data: any, { rejectWithValue }) => {
        socket.emit("send-message", data);
    }
);

const initialState: {
    isConnected: boolean;
    message: any[];
} = {
    isConnected: false,
    message: [],
};

const socketSlice = createSlice({
    name: "socket",
    initialState,
    reducers: {
        addMessage: (state, action) => {
            state.message.push(action.payload);
        },
    },
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

export const { addMessage } = socketSlice.actions;

export default socketSlice.reducer;
