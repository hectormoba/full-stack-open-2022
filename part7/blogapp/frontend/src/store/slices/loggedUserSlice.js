import { createSlice } from "@reduxjs/toolkit";
import loggedUserService from "../../services/loggedUser";

const InitialUserState = { token: "", user: "", username: "" };

const logedUserSlice = createSlice({
  name: "user",
  initialState: InitialUserState,
  reducers: {
    storeUserInfo(state, action) {
      loggedUserService.setUser(action.payload);
      return action.payload;
    },
    deleteStoredUserInfo() {
      loggedUserService.clearUser();
      return InitialUserState;
    },
    getUserAndUpdateState() {
      const user = loggedUserService.getUser();
      if (user) {
        loggedUserService.setUser(user);
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
} = logedUserSlice.actions;

export default logedUserSlice.reducer;
