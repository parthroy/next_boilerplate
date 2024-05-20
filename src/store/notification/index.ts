import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const id = 0;

export const NOTIFICATION_TYPE = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
  DEFAULT: 'default',
};
const initialState = {
  duration: 4000,
  notificationMessage: "",
  notificationOpen: false,
  notificationType: NOTIFICATION_TYPE.ERROR,
  id: id,
};
export const notify = (message: string, type: keyof typeof NOTIFICATION_TYPE = 'DEFAULT') => {
  toast[type](message);
};
const notificationSlice = createSlice({
  name: "notification",
  initialState: initialState,
  reducers: {
    showErrorNotification: (state, action) => {
      state.notificationMessage = action.payload.msg;
      state.notificationType = action.payload.NotificationType;
      state.duration = action.payload.duration || 4000;
      state.id++;
      state.notificationOpen = true;
    },
    removeErrorNotification: (state, action) => {
      return initialState;
    },
    clearNotification: (state) => initialState,
  },
});

const { showErrorNotification, clearNotification, removeErrorNotification } =
  notificationSlice.actions;

export default notificationSlice.reducer;

export { showErrorNotification, clearNotification, removeErrorNotification };
