// notificationSlice.js
import { createSlice } from "@reduxjs/toolkit";

const NotificationSlice = createSlice({
  name: "notification",
  initialState: {
    message: "",
    type: "success", // could be 'success' or 'error'
    show: false,
  },
  reducers: {
    showNotification: (state, action) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
      state.show = true;
    },
    hideNotification: (state) => {
      state.show = false;
      state.message = "";
    },
  },
});

export const { showNotification, hideNotification } = NotificationSlice.actions;

export default NotificationSlice.reducer;
