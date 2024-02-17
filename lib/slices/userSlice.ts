"use client";

import axiosInstance from "@/app/utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// signup user
export const signupUser = createAsyncThunk(
    "user/signupUser",
    async (userCredentials: object, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_ORIGIN}/users/signup`,
                userCredentials
            );
            localStorage.setItem("accessToken", response.data.data.accessToken);
            localStorage.setItem(
                "refreshToken",
                response.data.data.refreshToken
            );

            return response.data.data.user;
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
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_ORIGIN}/users/login`,
                { mobileNo: "9399823477", password: "ayaanshrajotia" }
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
            return response.data.data.user;
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
            localStorage.removeItem("user");
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            console.log("Logged out");

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
    error: false,
};
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.user = null;
                state.error = false;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.error = false;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                state.error = true;
            })
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = null;
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
