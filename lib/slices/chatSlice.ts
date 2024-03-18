import axiosInstance from "@/app/utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllMessages = createAsyncThunk(
    "chat/getAllMessages",
    async (
        { roomId, page }: { roomId: string; page: number },
        { rejectWithValue }
    ) => {
        try {
            console.log(page);
            const response = await axiosInstance.get(
                `messages/${roomId}/all?page=${page}&limit=30`
            );
            return { ...response.data.data, append: page > 1 };
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
    hasNextPage: true,
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
        setLoadingFalse: (state, action) => {
            state.messageLoading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllMessages.pending, (state) => {
                state.messageLoading = true;
            })
            .addCase(getAllMessages.fulfilled, (state, action) => {
                console.log(action.payload);
                if (action.payload.append) {
                    state.messages = [
                        ...action.payload.docs,
                        ...state.messages,
                    ];
                } else {
                    state.messages = action.payload.docs;
                }
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

export const { addMessage, setLoadingFalse } = chatSlice.actions;

export default chatSlice.reducer;
