import axiosInstance from "@/app/utils/axios";
import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";

export const getAllRooms = createAsyncThunk(
    "room/getAllRooms",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/rooms/all-rooms?limit=100`);
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

export const getRoomProfileDetails = createAsyncThunk(
    "room/getRoomProfileDetails",
    async (roomId: string, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(
                `/rooms/room-profile/${roomId}`
            );
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const getRoomGossips = createAsyncThunk(
    "room/getRoomGossips",
    async (roomId: string, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(
                `/rooms/${roomId}/get-gossip-messages`
            );
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const getRoomMembers = createAsyncThunk(
    "room/getRoomMembers",
    async (roomId: string, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(
                `/rooms/${roomId}/get-room-members`
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
            return response.data.data || [];
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
            return response.data.data || [];
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
    getRoomProfileDetailsLoading: boolean;
    privateRoom: any;
    publicRooms: any;
    trendingRooms: any;
    recentlyAddedRooms: any;
    allRooms: any;
    roomProfileDetails: any;
    roomDetails: any;
    error: boolean;
    roomGossips: any;
    roomGossipsLoading: boolean;
    roomMembers: any;
    roomMembersLoading: boolean;
} = {
    privateLoading: false,
    privateRoom: {},
    trendingLoading: false,
    trendingRooms: null,
    recentlyAddedLoading: false,
    recentlyAddedRooms: null,
    collegeRoomsLoading: false,
    collegeRooms: [],
    publicLoading: false,
    publicRooms: [],
    getRoomDetailsLoading: false,
    getRoomProfileDetailsLoading: false,
    roomDetails: {},
    roomProfileDetails: {},
    allRooms: [],
    loading: false,
    error: false,
    roomGossips: [],
    roomGossipsLoading: false,
    roomMembers: [],
    roomMembersLoading: false,
};

const roomSlice = createSlice({
    name: "room",
    initialState,
    reducers: {
        addPublicJoinedRoom: (state, action) => {
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
            .addCase(getRoomProfileDetails.pending, (state) => {
                state.getRoomProfileDetailsLoading = true;
            })
            .addCase(getRoomProfileDetails.fulfilled, (state, action) => {
                state.getRoomProfileDetailsLoading = false;
                state.roomProfileDetails = action.payload;
                state.error = false;
            })
            .addCase(getRoomProfileDetails.rejected, (state, action) => {
                state.getRoomProfileDetailsLoading = false;
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
            })
            .addCase(getRoomGossips.pending, (state) => {
                state.roomGossipsLoading = true;
            })
            .addCase(getRoomGossips.fulfilled, (state, action) => {
                state.roomGossipsLoading = false;
                state.roomGossips = action.payload.messages;
                state.error = false;
            })
            .addCase(getRoomGossips.rejected, (state, action) => {
                state.roomGossipsLoading = false;
                state.error = true;
            })
            .addCase(getRoomMembers.pending, (state) => {
                state.roomMembersLoading = true;
            })
            .addCase(getRoomMembers.fulfilled, (state, action) => {
                state.roomMembersLoading = false;
                state.roomMembers = action.payload;
                state.error = false;
            })
            .addCase(getRoomMembers.rejected, (state, action) => {
                state.roomMembersLoading = false;
                state.error = true;
            });
    },
});

export const { addPublicJoinedRoom, removePublicJoinedRoom } =
    roomSlice.actions;

export default roomSlice.reducer;
