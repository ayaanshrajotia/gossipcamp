"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const signupUser = createAsyncThunk(
    "user/signupUser",
    async (userCredentials: object) => {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_SERVER_ORIGIN}/users/signup`,
            userCredentials
        );
        if (response.data.statusCode === 200) {
        }
        return response.data.data.user;
    }
);

// login user
export const loginUser = createAsyncThunk(
    "user/loginUser",
    async (userCredentials: object, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_ORIGIN}/users/login`,
                userCredentials
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
    reducers: {
        logout: (state) => {
            state.user = null;
            localStorage.removeItem("user");
            console.log("Logged out");
        },
    },
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
            });
    },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
