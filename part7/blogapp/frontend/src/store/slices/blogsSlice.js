import { createSlice } from "@reduxjs/toolkit";
import blogs from "../../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    updateBlogs(state, action) {
      return [...action.payload];
    },
    createBlog(state, action) {
      return state.concat(action.payload);
    },
    deleteBlog(state, action) {
      const id = action.payload;
      return state.filter((blog) => blog.id !== id);
    },
  },
});

const { updateBlogs, createBlog, deleteBlog } = blogSlice.actions;

const byLikes = (a, z) => z.likes - a.likes;

const getAllThunk = async (dispatch) => {
  const response = await blogs.getAll();
  response.sort(byLikes);
  dispatch(updateBlogs(response));
};

export const fetchBlogs = () => {
  return async (dispatch) => {
    await getAllThunk(dispatch);
  };
};

export const createBlogThunk = (newBlog) => {
  return async (dispatch, getState) => {
    const token = getState().user.token;
    const response = await blogs.create(newBlog, token);
    dispatch(createBlog(response));
  };
};

export const deleteBlogById = (id) => {
  return async (dispatch, getState) => {
    const token = getState().user.token;
    await blogs.remove(id, token);
    dispatch(deleteBlog(id));
  };
};

export { updateBlogs, createBlog };
export default blogSlice.reducer;
