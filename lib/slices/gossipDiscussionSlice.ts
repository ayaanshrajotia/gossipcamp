import axiosInstance from "@/app/utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllGossipMessages = createAsyncThunk(
    "gossipDiscussion/getAllGossipDiscussionMessages",
    async (
        {
            roomId,
            offset,
            messageId,
        }: { roomId: string; offset: number; messageId: string },
        { rejectWithValue }
    ) => {
        try {
            const response = await axiosInstance.get(
                `messages/get-gossip-messages/${roomId}/${messageId}?offset=${offset}&limit=50`
            );

            return { ...response.data.data, offset: offset > 0 };
        } catch (error) {
            console.log(error);
            return rejectWithValue(error);
        }
    }
);

export const deleteGossipDiscussionMessageApi = createAsyncThunk(
    "gossipDiscussion/deleteGossipDiscussionMessage",
    async (gossipMessageId: string, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.delete(
                `messages/delete-gossip-message/` + gossipMessageId
            );
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const initialState: {
    gossipDiscussion: boolean;
    gossipDisscussionData: {
        id: string;
        isLiked: boolean;
        messageType: string;
        date: string;
        profileUrl: string;
        user: string;
        description: string;
        likesCount: number;
        isUser: boolean;
        postImgUrl: string;
    };
    gossipDiscussionMessages: any[];
    gossipDiscussionMessagesKeyIndexPair: { [key: string]: number };
    gossipDiscussionMessagesLoading: boolean;
    offset: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
} = {
    gossipDiscussion: false,
    gossipDisscussionData: {
        id: "",
        isLiked: false,
        messageType: "",
        date: "",
        profileUrl: "",
        user: "",
        description: "",
        likesCount: 0,
        isUser: false,
        postImgUrl: "",
    },
    gossipDiscussionMessages: [],
    gossipDiscussionMessagesKeyIndexPair: {},
    gossipDiscussionMessagesLoading: false,
    offset: 0,
    hasNextPage: true,
    hasPrevPage: false,
};

const gossipDiscussionSlice = createSlice({
    name: "gossipDiscussion",
    initialState,
    reducers: {
        setGossipDiscussion: (state, action) => {
            state.gossipDiscussion = action.payload;
        },
        setGossipDiscussionData: (state, action) => {
            state.gossipDisscussionData.id = action.payload.id;
            state.gossipDisscussionData.isLiked = action.payload.isLiked;
            state.gossipDisscussionData.messageType =
                action.payload.messageType;
            state.gossipDisscussionData.date = action.payload.date;
            state.gossipDisscussionData.profileUrl = action.payload.profileUrl;
            state.gossipDisscussionData.user = action.payload.user;
            state.gossipDisscussionData.description =
                action.payload.description;
            state.gossipDisscussionData.likesCount = action.payload.likesCount;
            state.gossipDisscussionData.isUser = action.payload.isUser;
            state.gossipDisscussionData.postImgUrl = action.payload.postImgUrl;
        },
        addGossipDiscussionMessage: (state, action) => {
            state.gossipDiscussionMessages.push(action.payload);
            state.gossipDiscussionMessagesKeyIndexPair[action.payload.id] =
                state.gossipDiscussionMessages.length - 1;
        },
        updateGossipDiscussionMessage: (state, action) => {
            let oldId =
                state.gossipDiscussionMessages[action.payload.index]._id;
            delete state.gossipDiscussionMessagesKeyIndexPair[oldId];
            state.gossipDiscussionMessagesKeyIndexPair[action.payload.message._id] =
                action.payload.index;
            state.gossipDiscussionMessages[action.payload.index] =
                action.payload.message;
        },
        deleteAndUpdateGossipDiscussionMessage: (state, action) => {
            let index =
                state.gossipDiscussionMessagesKeyIndexPair[
                    action.payload.gossipMessageId
                ];
            if (index !== undefined) {
                state.gossipDiscussionMessages[index] = {
                    ...state.gossipDiscussionMessages[index],
                    messageType: "Text",
                    text: "❌ This message is deleted",
                };
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllGossipMessages.pending, (state, action) => {
                state.gossipDiscussionMessagesLoading = true;
            })
            .addCase(getAllGossipMessages.fulfilled, (state, action) => {
                // console.log(action.payload);
                if (action.payload.offset) {
                    let addIndex = state.gossipDiscussionMessages.length;
                    state.gossipDiscussionMessages = [
                        ...action.payload.docs,
                        ...state.gossipDiscussionMessages,
                    ];

                    action.payload?.docs.forEach(
                        (message: any, index: number) => {
                            state.gossipDiscussionMessagesKeyIndexPair[
                                message._id
                            ] = addIndex + index;
                        }
                    );
                } else {
                    state.gossipDiscussionMessages = action.payload.docs;
                    state.gossipDiscussionMessagesKeyIndexPair = {};
                    action.payload.docs.forEach(
                        (message: any, index: number) => {
                            state.gossipDiscussionMessagesKeyIndexPair[
                                message._id
                            ] = index;
                        }
                    );
                }

                state.offset = action.payload.docs.length;
                state.hasNextPage = action.payload.hasNextPage;
                state.gossipDiscussionMessagesLoading = false;
            })
            .addCase(
                deleteGossipDiscussionMessageApi.rejected,
                (state, action) => {
                    console.log(action.payload);
                }
            );
    },
});

export const {
    setGossipDiscussion,
    setGossipDiscussionData,
    addGossipDiscussionMessage,
    updateGossipDiscussionMessage,
    deleteAndUpdateGossipDiscussionMessage,
} = gossipDiscussionSlice.actions;
export default gossipDiscussionSlice.reducer;
