import axiosInstance from "@/app/utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { stat } from "fs";

export const getAllMessages = createAsyncThunk(
    "chat/getAllMessages",
    async (
        { roomId, offset }: { roomId: string; offset: number },
        { rejectWithValue }
    ) => {
        try {
            const response = await axiosInstance.get(
                `messages/${roomId}/all?offset=${offset}&limit=50`
            );

            return { ...response.data.data, offset: offset > 0 };
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
            return { _id: id, isLiked: isLiked, messageId: id };
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const toggleGossipMessage = createAsyncThunk(
    "chat/toggleGossipMessage",
    async (
        { id, isGossipVoted }: { id: string; isGossipVoted: boolean },
        { rejectWithValue }
    ) => {
        try {
            const response = await axiosInstance.post(
                `messages/toggle-gossip-vote-message/${id}`
            );
            return { _id: id, isGossipVoted: isGossipVoted, messageId: id };
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const togglePollMessage = createAsyncThunk(
    "chat/togglePollMessage",
    async (
        {
            roomId,
            messageId,
            optionIndex,
        }: { roomId: string; messageId: string; optionIndex: string },
        { rejectWithValue }
    ) => {
        try {
            const response = await axiosInstance.post(
                `messages/vote-poll/${roomId}/${messageId}/${optionIndex}`
            );
            return response.data.data;
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
    offset: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    totalPages: number;
    likesLoading: boolean;
    gossipLoading: boolean;
} = {
    messages: [],
    roomId: "",
    messageError: null,
    messagesKeyIndexPair: {},
    messageLoading: false,
    offset: 0,
    hasNextPage: true,
    hasPrevPage: false,
    totalPages: 0,
    likesLoading: false,
    gossipLoading: false,
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
        updateGossipVoteMessage: (state, action) => {
            let index = state.messagesKeyIndexPair[action.payload.messageId];
            if (index !== undefined) {
                state.messages[index].gossipVotesCount =
                    state.messages[index].gossipVotesCount +
                    (action.payload.isGossipVoted ? 1 : -1);
            }
        },
        deleteAndUpdateMessage: (state, action) => {
            let index = state.messagesKeyIndexPair[action.payload.messageId];
            if (index !== undefined) {
                state.messages[index] = {
                    ...state.messages[index],
                    messageType: "Text",
                    text: "❌ This message is deleted",
                };
            }
        },
        updatePollVote: (state, action) => {
            let index = state.messagesKeyIndexPair[action.payload.messageId];
            if (index !== undefined) {
                let pollIndex = state.messages[index].pollIndex;
                if (pollIndex != "-1") {
                    pollIndex = parseInt(pollIndex);
                    state.messages[index].pollOptions[pollIndex].votes -= 1;
                }

                if (action.payload.optionIndex != "-1") {
                    let optionIndex = parseInt(action.payload.optionIndex);
                    state.messages[index].pollOptions[optionIndex].votes += 1;
                }
                state.messages[index].pollIndex = action.payload.optionIndex;
            }
        },
        changePollVotes: (state, action) => {
            let index = state.messagesKeyIndexPair[action.payload.messageId];
            if (index !== undefined) {
                let oldIndex = action.payload.oldValue;
                if (oldIndex != "-1") {
                    oldIndex = parseInt(oldIndex);
                    state.messages[index].pollOptions[oldIndex].votes -= 1;
                }
                let newIndex = action.payload.optionIndex;
                if (newIndex != "-1") {
                    newIndex = parseInt(newIndex);
                    state.messages[index].pollOptions[newIndex].votes += 1;
                }
            }
        },
        updateMessageToGossip: (state, action) => {
            let index = state.messagesKeyIndexPair[action.payload.messageId];
            if (index !== undefined) {
                state.messages[index].isGossip = true;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllMessages.pending, (state) => {
                state.messageLoading = true;
            })
            .addCase(getAllMessages.fulfilled, (state, action) => {
                if (action.payload.offset) {
                    let addIndex = state.messages.length;
                    state.messages = [
                        ...action.payload.docs,
                        ...state.messages,
                    ];

                    action.payload?.docs.forEach(
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

                state.offset = action.payload.docs.length;
                state.hasNextPage = action.payload.hasNextPage;
                state.messageLoading = false;
            })
            .addCase(getAllMessages.rejected, (state, action) => {
                state.messageLoading = false;
            })
            .addCase(toggleLikeMessage.pending, (state) => {
                state.likesLoading = true;
            })
            .addCase(toggleLikeMessage.fulfilled, (state: any, action) => {
                let index =
                    state.messagesKeyIndexPair[action.payload.messageId];
                state.messages[index].isLiked = action.payload.isLiked;
                state.likesLoading = false;
            })
            .addCase(toggleLikeMessage.rejected, (state, action) => {
                state.likesLoading = false;
                // state.messageError = action.payload;
                console.log(action.payload);
            })
            .addCase(toggleGossipMessage.pending, (state) => {
                state.gossipLoading = true;
            })
            .addCase(toggleGossipMessage.fulfilled, (state, action) => {
                let index =
                    state.messagesKeyIndexPair[action.payload.messageId];
                state.messages[index].isGossipVoted =
                    action.payload.isGossipVoted;
                state.gossipLoading = false;
            })
            .addCase(toggleGossipMessage.rejected, (state, action) => {
                state.gossipLoading = false;
                console.log(action.payload);
            })
            .addCase(deleteMessageApi.rejected, (state, action) => {
                console.log(action.payload);
            })
            .addCase(togglePollMessage.pending, (state) => {})
            .addCase(togglePollMessage.fulfilled, (state, action) => {
                console.log(action.payload);
            })
            .addCase(togglePollMessage.rejected, (state, action) => {
                console.log(action.payload);
            });
    },
});

export const {
    addMessage,
    setLoadingFalse,
    updateMessage,
    updateLikeMessage,
    updateGossipVoteMessage,
    deleteAndUpdateMessage,
    updatePollVote,
    changePollVotes,
    updateMessageToGossip,
} = chatSlice.actions;

export default chatSlice.reducer;
