import { createSlice } from "@reduxjs/toolkit";
import usersService from "../../services/users";

const usersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    getUsers(state, action) {
      return [...action.payload];
    },
  },
});

const { getUsers } = usersSlice.actions;

export const fetchUsers = () => {
  return async (dispatch) => {
    const respone = await usersService.getAll();
    dispatch(getUsers(respone));
  };
};

export default usersSlice.reducer;
