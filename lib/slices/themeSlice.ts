// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     theme:
//         typeof window !== "undefined" && localStorage.getItem("theme")
//             ? JSON.parse(localStorage.getItem("theme")!)
//             : null,
// };

// const themeSlice = createSlice({
//     name: "theme",
//     initialState,
//     reducers: {
//         setTheme: (state, action) => {
//             state.theme = action.payload;
//             localStorage.setItem("theme", JSON.stringify(state.theme));
//         },
//     },
// });

// export const { setTheme } = themeSlice.actions;
// export default themeSlice.reducer;
