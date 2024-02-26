import axiosInstance from "@/app/utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllRooms = createAsyncThunk(
    "room/getAllRooms",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/rooms/all-rooms`);
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const getPrivateJoinedRooms = createAsyncThunk(
    "room/getPrivateRoom",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/rooms/private-room`);
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const getPublicJoinedRooms = createAsyncThunk(
    "room/getPublicRooms",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/rooms/public-rooms`);
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

const initialState: {
    loading: boolean;
    privateRoom: any;
    publicRooms: any;
    allRooms: any;
    error: boolean;
} = {
    loading: false,
    privateRoom: {},
    publicRooms: [],
    allRooms: [],
    error: false,
};

const roomSlice = createSlice({
    name: "room",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllRooms.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllRooms.fulfilled, (state, action) => {
                state.loading = false;
                state.allRooms = action.payload.docs;
                console.log(action.payload);
            })
            .addCase(getAllRooms.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
            })
            .addCase(getPrivateJoinedRooms.pending, (state) => {
                state.loading = true;
            })
            .addCase(getPrivateJoinedRooms.fulfilled, (state, action) => {
                state.loading = false;
                state.privateRoom = action.payload.room;
                state.error = false;
            })
            .addCase(getPrivateJoinedRooms.rejected, (state, action) => {})
            .addCase(getPublicJoinedRooms.pending, (state) => {
                state.loading = true;
            })
            .addCase(getPublicJoinedRooms.fulfilled, (state, action) => {
                state.loading = false;
                state.publicRooms = action.payload.rooms;
                state.error = false;
            })
            .addCase(getPublicJoinedRooms.rejected, (state, action) => {});
    },
});

export const {} = roomSlice.actions;

export default roomSlice.reducer;
