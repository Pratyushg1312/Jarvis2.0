// redux/routeSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  base: "",
  previousRoute: [],
};

const PreviousRoute = createSlice({
  name: "route",
  initialState,
  reducers: {
    setPreviousRoute: (state, action) => {
      const { base, previousRoute } = state;
      const copyPreviousRoute = [...previousRoute];
      const url = action.payload;
      const pathnames = url.split("/").filter((x) => x);
      if (pathnames[0] === base) {
        const index = copyPreviousRoute.findIndex(
          (route) => route === pathnames[1]
        );
        if (index === -1) {
          if (copyPreviousRoute.length === 1) {
            copyPreviousRoute.shift();
          }
          copyPreviousRoute.push(pathnames[1]);
          state.previousRoute = copyPreviousRoute;
        } else {
          state.previousRoute = copyPreviousRoute.slice(0, index + 1);
        }
      } else if (pathnames[0] !== base) {
        state.base = pathnames[0];
        state.previousRoute = [pathnames[1]];
      } else {
        state.base = "";
        state.previousRoute = [];
      }
    },
  },
});

export const { setPreviousRoute } = PreviousRoute.actions;

export default PreviousRoute.reducer;
