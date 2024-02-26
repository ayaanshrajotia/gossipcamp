import axiosInstance from "@/app/utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// signup user
export const signupUser = createAsyncThunk(
    "user/signupUser",
    async (userCredentials: object, { rejectWithValue }) => {
        try {
            console.log(userCredentials);
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_ORIGIN}/users/register`,
                userCredentials
            );
            localStorage.setItem("accessToken", response.data.data.accessToken);
            localStorage.setItem(
                "refreshToken",
                response.data.data.refreshToken
            );
            localStorage.setItem(
                "user",
                JSON.stringify(response.data.data.user)
            );
            document.cookie = `accessToken=${response.data.data.accessToken}`;
            document.cookie = `refreshToken=${response.data.data.refreshToken}`;
            document.cookie = `profile=null`;

            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

// login user
export const loginUser = createAsyncThunk(
    "user/loginUser",
    async (userCredentials: object, { rejectWithValue }) => {
        try {
            console.log(userCredentials)
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_ORIGIN}/users/login`,
                // { mobileNo: "7880049324", password: "nehakumari" }
                // { mobileNo: "8109774963", password: "adi@1234" }
                // { userId: "0176CD211033", password: "ayaanshrajotia" }
                // { userId: "0157cs211145", password: "pulkitgupta" }
                userCredentials
            );
            document.cookie = `accessToken=${response.data.data.accessToken}`;
            document.cookie = `refreshToken=${response.data.data.refreshToken}`;
            document.cookie = `profile=${JSON.stringify(
                response.data.data.profile
            )}`;

            localStorage.setItem("accessToken", response.data.data.accessToken);
            localStorage.setItem(
                "refreshToken",
                response.data.data.refreshToken
            );
            localStorage.setItem(
                "user",
                JSON.stringify(response.data.data.user)
            );
            localStorage.setItem(
                "profile",
                JSON.stringify(response.data.data.profile)
            );
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

// create user profile
export const createAvatar = createAsyncThunk(
    "user/createAvatar",
    async (profile: object, { rejectWithValue }) => {
        try {
            console.log(profile);
            const response = await axiosInstance.post(
                `/users/create-profile`,
                profile
            );
            localStorage.setItem("profile", JSON.stringify(response.data.data));
            document.cookie = `profile=${JSON.stringify(response.data.data)}`;
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

// logout user
export const logoutUser = createAsyncThunk(
    "user/logoutUser",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(`/users/logout`);
            document.cookie =
                "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            document.cookie =
                "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            document.cookie =
                "profile=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            localStorage.removeItem("user");
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("profile");
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

const initialState = {
    loading: false,
    user:
        typeof window !== "undefined" && localStorage.getItem("user")
            ? JSON.parse(localStorage.getItem("user")!)
            : null,
    profile:
        typeof window !== "undefined" && localStorage.getItem("profile")
            ? JSON.parse(localStorage.getItem("profile")!)
            : null,
    error: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(signupUser.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.error = false;
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                console.log(action.payload);
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.user = null;
                state.error = false;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.profile = action.payload.profile;
                state.error = false;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                state.error = true;
            })
            .addCase(createAvatar.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(createAvatar.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = action.payload;
                state.error = false;
            })
            .addCase(createAvatar.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                console.log(action);
            })
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = null;
                state.profile = null;
                state.error = false;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                state.error = true;

                console.log(action);
            });
    },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
