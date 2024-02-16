import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export const loginUser = createAsyncThunk(
    "user/loginUser",
    async (userCredentials: object) => {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_SERVER_ORIGIN}/users/login`,
            userCredentials
        );
        if (response.data.statusCode === 200) {
            // localStorage.setItem(
            //     "accessToken",
            //     JSON.stringify(response.data.data.accessToken)
            // );
            localStorage.setItem(
                "user",
                JSON.stringify(response.data.data.user)
            );

            console.log(response);

            toast.success(response.data.message);
        }
        return response.data.data.user;
    }
);

const initialState = {
    loading: false,
    user: localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")!)
        : null,
    error: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            localStorage.removeItem("user");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.user = null;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                console.log(action.payload);
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                console.log(action);
            });
    },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
