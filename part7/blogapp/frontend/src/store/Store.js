import { configureStore } from "@reduxjs/toolkit";
import notificationSlice from "./slices/notificationSlice";
import blogsSlice from "./slices/blogsSlice";
import loggedUserSlice from "./slices/loggedUserSlice";
import usersSlice from "./slices/usersSlice";

const store = configureStore({
  reducer: {
    notification: notificationSlice,
    blogs: blogsSlice,
    loggedUser: loggedUserSlice,
    users: usersSlice,
  },
});

export default store;
