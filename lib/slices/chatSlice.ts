import axiosInstance from "@/app/utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllMessages = createAsyncThunk(
    "chat/getAllMessages",
    async (
        { roomId, page }: { roomId: string; page: number },
        { rejectWithValue }
    ) => {
        try {
            const response = await axiosInstance.get(
                `messages/${roomId}/all?page=${page}`
            );
            console.log(response.data.data.docs);
            return response.data.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error);
        }
    }
);

const initialState: {
    messages: any[];
    roomId: string;
    messageLoading: boolean;
    messageError: any;
    page: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    totalPages: number;
} = {
    messages: [],
    roomId: "",
    messageError: null,
    messageLoading: false,
    page: 0,
    hasNextPage: false,
    hasPrevPage: false,
    totalPages: 0,
};

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        addMessage: (state, action) => {
            state.messages.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllMessages.pending, (state) => {
                state.messageLoading = true;
            })
            .addCase(getAllMessages.fulfilled, (state, action) => {
                // console.log(action.payload);
                state.messages = action.payload.docs;
                state.page = action.payload.page;
                state.hasNextPage = action.payload.hasNextPage;
                state.hasPrevPage = action.payload.hasPrevPage;
                state.totalPages = action.payload.totalPages;
                state.messageLoading = false;
            })
            .addCase(getAllMessages.rejected, (state, action) => {
                state.messageLoading = false;
                state.messageError = action.payload;
            });
    },
});

export const { addMessage } = chatSlice.actions;

export default chatSlice.reducer;
