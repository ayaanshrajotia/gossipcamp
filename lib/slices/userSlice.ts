import axiosInstance from "@/app/utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllUsers = createAsyncThunk(
    "user/getAllUsers",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(
                `/profiles/all-users?limit=50`
            );
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const getSingleUser = createAsyncThunk(
    "user/getSingleUser",
    async (username: string, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(
                `/profiles/user-profile/${username}`
            );
            console.log(response);
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const getSingleUserPosts = createAsyncThunk(
    "user/getSingleUserPosts",
    async (userId: string, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(
                `/profile/${userId}/posts`
            );
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const getSingleUserRooms = createAsyncThunk(
    "user/getSingleUserRooms",
    async (userId: string, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(
                `/profile/${userId}/rooms`
            );
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const getSingleUserFollowers = createAsyncThunk(
    "user/getSingleUserFollowers",
    async (userId: string, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(
                `/profile/${userId}/followers`
            );
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const getSingleUserFollowing = createAsyncThunk(
    "user/getSingleUserFollowing",
    async (userId: string, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/following`);
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const toggleFollowUser = createAsyncThunk(
    "user/toggleFollowUser",
    async (userId: string, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(
                `/users/toggle-follow/${userId}`
            );
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

const initialState: {
    userLoading: boolean;
    userProfile: any;
    roomsLoading: boolean;
    postsLoading: boolean;
    followersLoading: boolean;
    followingLoading: boolean;
    rooms: any[];
    posts: any[];
    followers: any[];
    following: any[];
    loading: boolean;
    users: any[];
    error: boolean;
} = {
    roomsLoading: false,
    postsLoading: false,
    followersLoading: false,
    followingLoading: false,
    rooms: [],
    posts: [],
    followers: [],
    following: [],
    loading: false,
    users: [],
    userProfile: {},
    userLoading: false,
    error: false,
};

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload.docs;
            })
            .addCase(getAllUsers.rejected, (state) => {
                state.loading = false;
                state.error = true;
            })
            .addCase(getSingleUser.pending, (state) => {
                state.userLoading = true;
            })
            .addCase(getSingleUser.fulfilled, (state, action) => {
                state.userLoading = false;
                state.userProfile = action.payload;
                console.log(action.payload);
            })
            .addCase(getSingleUser.rejected, (state) => {
                state.userLoading = false;
                state.error = true;
            })
            .addCase(getSingleUserPosts.pending, (state) => {
                state.postsLoading = true;
            })
            .addCase(getSingleUserPosts.fulfilled, (state, action) => {
                state.postsLoading = false;
                state.posts = action.payload;
            })
            .addCase(getSingleUserPosts.rejected, (state) => {
                state.postsLoading = false;
                state.error = true;
            })
            .addCase(getSingleUserRooms.pending, (state) => {
                state.roomsLoading = true;
            })
            .addCase(getSingleUserRooms.fulfilled, (state, action) => {
                state.roomsLoading = false;
                state.rooms = action.payload;
            })
            .addCase(getSingleUserRooms.rejected, (state) => {
                state.roomsLoading = false;
                state.error = true;
            })
            .addCase(getSingleUserFollowers.pending, (state) => {
                state.followersLoading = true;
            })
            .addCase(getSingleUserFollowers.fulfilled, (state, action) => {
                state.followersLoading = false;
                state.followers = action.payload;
            })
            .addCase(getSingleUserFollowers.rejected, (state) => {
                state.followersLoading = false;
                state.error = true;
            })
            .addCase(getSingleUserFollowing.pending, (state) => {
                state.followingLoading = true;
            })
            .addCase(getSingleUserFollowing.fulfilled, (state, action) => {
                state.followingLoading = false;
                state.following = action.payload;
            })
            .addCase(getSingleUserFollowing.rejected, (state) => {
                state.followingLoading = false;
                state.error = true;
            })
            .addCase(toggleFollowUser.pending, (state) => {})
            .addCase(toggleFollowUser.fulfilled, (state, action) => {
                // console.log(action.payload);
            })
            .addCase(toggleFollowUser.rejected, (state) => {});
    },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
