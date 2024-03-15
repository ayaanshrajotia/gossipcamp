import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import roomReducer from "./slices/roomSlice";
import userReducer from "./slices/userSlice";
import socketReducer from "./slices/socketSlice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            auth: authReducer,
            rooms: roomReducer,
            users: userReducer,
            socket: socketReducer,
        },
    });
};

// Infer the type of makeStore
export const store = makeStore();
// export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
