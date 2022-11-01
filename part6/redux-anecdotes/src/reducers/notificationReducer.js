import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: 'notification',
  initialState: [],
  reducers: {
    displayNotification(state, action){
      state.push(action.payload)
    },
    resetNotificationState(){
      return []
    }
  }
})

export const { displayNotification, resetNotificationState } = notificationSlice.actions
export default notificationSlice.reducer