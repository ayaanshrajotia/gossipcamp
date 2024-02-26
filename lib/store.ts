import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import roomReducer from "./slices/roomSlice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            user: userReducer,
            rooms: roomReducer,
        },
    });
};

// Infer the type of makeStore
export const store = makeStore();
// export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
