import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ref: false,
};
const ThemeCollapseSlice = createSlice({
  name: "themeCollapse",
  initialState,
  reducers: {
    setthemeCollapse: (state, action) => {
      state.ref = action.payload;
    },
  },
});

export const { setthemeCollapse } = ThemeCollapseSlice.actions;
export default ThemeCollapseSlice.reducer;
