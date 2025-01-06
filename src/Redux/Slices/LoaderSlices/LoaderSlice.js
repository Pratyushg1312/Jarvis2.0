import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
};

const Loader = createSlice({
  name: "loader",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setLoading } = Loader.actions;
export default Loader.reducer;
