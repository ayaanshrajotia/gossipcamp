import { socket } from "@/app/StoreProvider";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const connectSocket = createAsyncThunk(
    "socket/connectSocket",
    async (_, { rejectWithValue }) => {
        try {
            await socket.connect();
        } catch (err) {
            rejectWithValue(err);
        }
    }
);

export const disconnectSocket = createAsyncThunk(
    "socket/disconnectSocket",
    async (_, { rejectWithValue }) => await socket.disconnect()
);

export const openRoom = createAsyncThunk(
    "socket/openRoom",
    async (data: any, { rejectWithValue }) => {
        socket.emit("open-room", data);
    }
);

export const closeRoom = createAsyncThunk(
    "socket/closeRoom",
    async (data: any, { rejectWithValue }) => {
        socket.emit("close-room", data);
    }
);

export const welcomeMessageListener = createAsyncThunk(
    "socket/welcomeMessageListener",
    // i need to get dispatch here
    async (_, { rejectWithValue, dispatch }) => {
        let x;
        socket.on("welcome-user", (data: any) => {
            x = data;
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

export const sendMessageEmitter = createAsyncThunk(
    "socket/sendMessageEmitter",
    async (data: any, { rejectWithValue }) => {
        socket.emit("send-message", data);
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
            .addCase(connectSocket.rejected, (state) => {
                state.isConnected = false;
            })
            .addCase(disconnectSocket.rejected, (state) => {
                state.isConnected = false;
            })
            .addCase(disconnectSocket.fulfilled, (state) => {
                state.isConnected = false;
            })
            .addCase(welcomeMessageListener.fulfilled, (state, action) => {
            });
    },
});

export const {} = socketSlice.actions;

export default socketSlice.reducer;
