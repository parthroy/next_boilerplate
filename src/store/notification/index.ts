import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const id = 0;

export const NOTIFICATION_TYPE = {
  INFO: toast.TYPE.INFO,
  SUCCESS: toast.TYPE.SUCCESS,
  WARNING: toast.TYPE.WARNING,
  ERROR: toast.TYPE.ERROR,
  DEFAULT: toast.TYPE.DEFAULT,
};
const initialState = {
  duration: 4000,
  notificationMessage: "",
  notificationOpen: false,
  notificationType: NOTIFICATION_TYPE.ERROR,
  id: id,
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
