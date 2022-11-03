import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    content: '',
    timerId: ''
  },
  reducers: {
    displayNotification(state, action){
      if(state.timerId !== '') {
        clearInterval(state.timerId)
      }
      return action.payload
    },
    resetNotificationState(state){
      clearInterval(state.timerId)
      return {
        content: '',
        timerId: ''
      }
    }
  }
})

export const { displayNotification, resetNotificationState } = notificationSlice.actions

export const setNotification = (content, timeinSeconds) => {
  return dispatch => {
    let timerId = setTimeout(() => {
      dispatch(resetNotificationState())
    }, (timeinSeconds * 1000))
    
    dispatch(displayNotification({ content, timerId }))
  }
} 

export default notificationSlice.reducer