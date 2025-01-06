import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  enable: false,
};
const SemiThemeSlice = createSlice({
  name: "semiTheme",
  initialState,
  reducers: {
    setSemiTheme: (state, action) => {
      state.enable = action.payload;
    },
  },
});

export const { setSemiTheme } = SemiThemeSlice.actions;
export default SemiThemeSlice.reducer;
