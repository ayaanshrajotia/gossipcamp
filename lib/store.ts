import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import roomReducer from "./slices/roomSlice";
import userReducer from "./slices/userSlice";
import socketReducer from "./slices/socketSlice";
import chatReducer from "./slices/chatSlice";
import blurReducer from "./slices/blurSlice";
import gossipDiscussionReducer from "./slices/gossipDiscussionSlice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            auth: authReducer,
            rooms: roomReducer,
            users: userReducer,
            socket: socketReducer,
            chat: chatReducer,
            blur: blurReducer,
            gossipDiscussion: gossipDiscussionReducer,
        },
    });
};

// Infer the type of makeStore
export const store = makeStore();
// export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
