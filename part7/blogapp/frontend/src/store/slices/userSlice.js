import { createSlice } from "@reduxjs/toolkit";
import userService from "../../services/user";

const InitialUserState = { token: "", user: "", username: "" };

const userSlice = createSlice({
  name: "user",
  initialState: InitialUserState,
  reducers: {
    storeUserInfo(state, action) {
      userService.setUser(action.payload);
      return action.payload;
    },
    deleteStoredUserInfo() {
      userService.clearUser();
      return InitialUserState;
    },
    getUserAndUpdateState() {
      const user = userService.getUser();
      if (user) {
        userService.setUser(user);
      }
      return user ?? InitialUserState;
    },
    getToken(state) {
      return state.token;
    },
  },
});

export const {
  storeUserInfo,
  deleteStoredUserInfo,
  getUserAndUpdateState,
  getToken,
} = userSlice.actions;

export default userSlice.reducer;
