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

export const setNotification = (content, timeinSeconds) => {
  return dispatch => {
    dispatch(displayNotification(content))

    let timerId = setTimeout(() => {
      dispatch(resetNotificationState())
    }, timeinSeconds * 1000)

    clearTimeout(timerId)
  }
} 

export default notificationSlice.reducer