import { createSlice } from "@reduxjs/toolkit";

const blurSlice = createSlice({
    name: "blur",
    initialState: {
        blur: false,
    },
    reducers: {
        setBlur: (state, action) => {
            state.blur = action.payload;
        },
    },
});

export const { setBlur } = blurSlice.actions;
export default blurSlice.reducer;
