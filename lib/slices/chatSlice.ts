import axiosInstance from "@/app/utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { stat } from "fs";

export const getAllMessages = createAsyncThunk(
    "chat/getAllMessages",
    async (
        { roomId, page }: { roomId: string; page: number },
        { rejectWithValue }
    ) => {
        try {
            const response = await axiosInstance.get(
                `messages/${roomId}/all?page=${page}&limit=50`
            );
            return { ...response.data.data, append: page > 1 };
        } catch (error) {
            console.log(error);
            return rejectWithValue(error);
        }
    }
);

export const deleteMessageApi = createAsyncThunk(
    "chat/deleteMessage",
    async (messageId: string, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.delete(
                `messages/delete-message/` + messageId
            );
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const toggleLikeMessage = createAsyncThunk(
    "chat/toggleLikeMessage",
    async (
        {
            id,
            isLiked,
        }: {
            id: string;
            isLiked: boolean;
        },
        { rejectWithValue }
    ) => {
        try {
            const response = await axiosInstance.post(
                `messages/toggle-like-message/${id}`
            );
            return { _id: id, isLiked: isLiked };
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const initialState: {
    messages: any[];
    messagesKeyIndexPair: { [key: string]: number };
    roomId: string;
    messageLoading: boolean;
    messageError: any;
    page: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    totalPages: number;
    likesLoading: boolean;
} = {
    messages: [],
    roomId: "",
    messageError: null,
    messagesKeyIndexPair: {},
    messageLoading: false,
    page: 0,
    hasNextPage: true,
    hasPrevPage: false,
    totalPages: 0,
    likesLoading: false,
};

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        addMessage: (state, action) => {
            state.messages.push(action.payload);
            state.messagesKeyIndexPair[action.payload._id] =
                state.messages.length - 1;
        },
        setLoadingFalse: (state, action) => {
            state.messageLoading = false;
        },
        updateMessage: (state, action) => {
            let oldId = state.messages[action.payload.index]._id;
            delete state.messagesKeyIndexPair[oldId];
            state.messagesKeyIndexPair[action.payload.message._id] =
                action.payload.index;
            state.messages[action.payload.index] = action.payload.message;
        },
        updateLikeMessage: (state, action) => {
            let index = state.messagesKeyIndexPair[action.payload.messageId];
            if (index !== undefined) {
                state.messages[index].likesCount =
                    state.messages[index].likesCount +
                    (action.payload.isLiked ? 1 : -1);
            }
        },
        deleteAndUpdateMessage: (state, action) => {
            let index = state.messagesKeyIndexPair[action.payload.messageId];
            if (index !== undefined) {
                state.messages[index] = {
                    ...state.messages[index],
                    messageType: "Text",
                    text: "This message is deleted",
                };
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllMessages.pending, (state) => {
                state.messageLoading = true;
            })
            .addCase(getAllMessages.fulfilled, (state, action) => {
                if (action.payload.append) {
                    let addIndex = state.messages.length;
                    state.messages = [
                        ...action.payload.docs,
                        ...state.messages,
                    ];

                    action.payload.docs.forEach(
                        (message: any, index: number) => {
                            state.messagesKeyIndexPair[message._id] =
                                addIndex + index;
                        }
                    );
                } else {
                    state.messages = action.payload.docs;
                    state.messagesKeyIndexPair = {};
                    action.payload.docs.forEach(
                        (message: any, index: number) => {
                            state.messagesKeyIndexPair[message._id] = index;
                        }
                    );
                }

                state.page = action.payload.page;
                state.hasNextPage = action.payload.hasNextPage;
                state.hasPrevPage = action.payload.hasPrevPage;
                state.totalPages = action.payload.totalPages;
                state.messageLoading = false;
            })
            .addCase(getAllMessages.rejected, (state, action) => {
                state.messageLoading = false;
            })
            .addCase(toggleLikeMessage.pending, (state) => {
                state.likesLoading = true;
            })
            .addCase(toggleLikeMessage.fulfilled, (state, action) => {
                state.likesLoading = false;
            })
            .addCase(toggleLikeMessage.rejected, (state, action) => {
                state.likesLoading = false;
                // state.messageError = action.payload;
                console.log(action.payload);
            })
            .addCase(deleteMessageApi.rejected, (state, action) => {
                console.log(action.payload);
            });
    },
});

export const {
    addMessage,
    setLoadingFalse,
    updateMessage,
    updateLikeMessage,
    deleteAndUpdateMessage,
} = chatSlice.actions;

export default chatSlice.reducer;
