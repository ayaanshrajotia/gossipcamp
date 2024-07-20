import { createSlice } from "@reduxjs/toolkit";

const gossipDiscussionSlice = createSlice({
    name: "gossipDiscussion",
    initialState: {
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
    },
    reducers: {
        setGossipDiscussion: (state, action) => {
            state.gossipDiscussion = action.payload;
        },
        setGossipDiscussionData: (state, action) => {
            console.log(action.payload)
            state.gossipDisscussionData.id = action.payload.id;
            state.gossipDisscussionData.isLiked = action.payload.isLiked;
            state.gossipDisscussionData.messageType = action.payload.messageType;
            state.gossipDisscussionData.date = action.payload.date;
            state.gossipDisscussionData.profileUrl = action.payload.profileUrl;
            state.gossipDisscussionData.user = action.payload.user;
            state.gossipDisscussionData.description = action.payload.description;
            state.gossipDisscussionData.likesCount = action.payload.likesCount;
            state.gossipDisscussionData.isUser = action.payload.isUser;
            state.gossipDisscussionData.postImgUrl = action.payload.postImgUrl;
        },
    },
});

export const { setGossipDiscussion, setGossipDiscussionData } =
    gossipDiscussionSlice.actions;
export default gossipDiscussionSlice.reducer;
