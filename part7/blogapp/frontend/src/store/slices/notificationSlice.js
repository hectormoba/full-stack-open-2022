import { createSlice } from "@reduxjs/toolkit";

const initialNotificationState = { type: "", message: "" };

const notificationSlice = createSlice({
  name: "notification",
  initialState: initialNotificationState,
  reducers: {
    pushNotification(state, action) {
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    resetNotification(state) {
      state.message = initialNotificationState.message;
      state.type = initialNotificationState.type;
    },
  },
});

const { pushNotification, resetNotification } = notificationSlice.actions;

export { pushNotification, resetNotification };
export default notificationSlice.reducer;
