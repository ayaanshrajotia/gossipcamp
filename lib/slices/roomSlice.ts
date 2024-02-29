import axiosInstance from "@/app/utils/axios";
import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";

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

export const getAllCollegeRooms = createAsyncThunk(
    "room/getAllCollegeRooms",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(
                `/rooms/all-college-rooms`
            );
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const getRoomDetails = createAsyncThunk(
    "room/getRoomDetails",
    async (roomId: string, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(
                `/rooms/room-details/${roomId}`
            );
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

export const getTrendingRooms = createAsyncThunk(
    "room/getTrendingRooms",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/rooms/trending-rooms`);
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const getRecentlyAddedRooms = createAsyncThunk(
    "room/getRecentlyAddedRooms",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/rooms/recent-rooms`);
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const toggleFollowRoom = createAsyncThunk(
    "room/toggleFollowRoom",
    async (roomId: string, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(
                `/rooms/${roomId}/toggle-follow`
            );
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

const initialState: {
    privateLoading: boolean;
    publicLoading: boolean;
    trendingLoading: boolean;
    recentlyAddedLoading: boolean;
    collegeRoomsLoading: boolean;
    collegeRooms: any;
    loading: boolean;
    getRoomDetailsLoading: boolean;
    privateRoom: any;
    publicRooms: any;
    trendingRooms: any;
    recentlyAddedRooms: any;
    allRooms: any;
    roomDetails: any;
    error: boolean;
} = {
    privateLoading: false,
    privateRoom: {},
    trendingLoading: false,
    trendingRooms: [],
    recentlyAddedLoading: false,
    recentlyAddedRooms: [],
    collegeRoomsLoading: false,
    collegeRooms: [],
    publicLoading: false,
    publicRooms: [],
    getRoomDetailsLoading: false,
    roomDetails: {},
    allRooms: [],
    loading: false,
    error: false,
};

const roomSlice = createSlice({
    name: "room",
    initialState,
    reducers: {
        addPublicJoinedRoom: (state, action) => {
            console.log(action.payload);
            const roomExists = state.publicRooms.some(
                (room: any) => room._id === action.payload.roomId
            );
            if (!roomExists) {
                state.publicRooms.push(action.payload);
            }
        },
        removePublicJoinedRoom: (state, action) => {
            state.publicRooms = state.publicRooms.filter(
                (room: any) => room._id !== action.payload
            );
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllRooms.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllRooms.fulfilled, (state, action) => {
                state.loading = false;
                state.allRooms = action.payload.docs;
            })
            .addCase(getAllRooms.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
            })
            .addCase(getPrivateJoinedRooms.pending, (state) => {
                state.privateLoading = true;
            })
            .addCase(getPrivateJoinedRooms.fulfilled, (state, action) => {
                state.privateRoom = action.payload.room;
                state.privateLoading = false;
                state.error = false;
            })
            .addCase(getPrivateJoinedRooms.rejected, (state, action) => {})
            .addCase(getPublicJoinedRooms.pending, (state) => {
                state.publicLoading = true;
            })
            .addCase(getPublicJoinedRooms.fulfilled, (state, action) => {
                state.publicRooms = action.payload.rooms;
                state.error = false;
                state.publicLoading = false;
            })
            .addCase(getPublicJoinedRooms.rejected, (state, action) => {
                state.publicLoading = false;
                state.error = true;
            })
            .addCase(getTrendingRooms.pending, (state) => {
                state.trendingLoading = true;
            })
            .addCase(getTrendingRooms.fulfilled, (state, action) => {
                state.trendingLoading = false;
                state.trendingRooms = action.payload.rooms;
                state.error = false;
            })
            .addCase(getTrendingRooms.rejected, (state, action) => {
                state.trendingLoading = false;
                state.error = true;
            })
            .addCase(getRecentlyAddedRooms.pending, (state) => {
                state.recentlyAddedLoading = true;
            })
            .addCase(getRecentlyAddedRooms.fulfilled, (state, action) => {
                state.recentlyAddedLoading = false;
                state.recentlyAddedRooms = action.payload.rooms;
                state.error = false;
            })
            .addCase(getRecentlyAddedRooms.rejected, (state, action) => {
                state.recentlyAddedLoading = false;
                state.error = true;
            })
            .addCase(toggleFollowRoom.pending, (state) => {})
            .addCase(toggleFollowRoom.fulfilled, (state, action) => {
                state.error = false;
            })
            .addCase(toggleFollowRoom.rejected, (state, action) => {
                state.error = true;
            })
            .addCase(getRoomDetails.pending, (state) => {
                state.getRoomDetailsLoading = true;
            })
            .addCase(getRoomDetails.fulfilled, (state, action) => {
                state.getRoomDetailsLoading = false;
                state.roomDetails = action.payload;
                state.error = false;
            })
            .addCase(getRoomDetails.rejected, (state, action) => {
                state.getRoomDetailsLoading = false;
                state.error = true;
            })
            .addCase(getAllCollegeRooms.pending, (state) => {
                state.collegeRoomsLoading = true;
            })
            .addCase(getAllCollegeRooms.fulfilled, (state, action) => {
                state.collegeRoomsLoading = false;
                state.collegeRooms = action.payload.docs;
                state.error = false;
            })
            .addCase(getAllCollegeRooms.rejected, (state, action) => {
                state.collegeRoomsLoading = false;
                state.error = true;
            });
    },
});

export const { addPublicJoinedRoom, removePublicJoinedRoom } =
    roomSlice.actions;

export default roomSlice.reducer;
