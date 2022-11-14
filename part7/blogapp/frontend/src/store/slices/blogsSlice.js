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
    updateBlog(state, action) {
      const id = action.payload.id;
      const newBlog = action.payload;
      return state.map((blog) => (blog.id === id ? newBlog : blog));
    },
  },
});

const { updateBlogs, createBlog, deleteBlog, updateBlog } = blogSlice.actions;

const byLikes = (a, z) => z.likes - a.likes;

export const fetchBlogs = () => {
  return async (dispatch) => {
    const response = await blogs.getAll();
    response.sort(byLikes);
    dispatch(updateBlogs(response));
  };
};

export const createBlogThunk = (newBlog) => {
  return async (dispatch, getState) => {
    const token = getState().loggedUser.token;
    const response = await blogs.create(newBlog, token);
    dispatch(createBlog(response));
  };
};

export const deleteBlogById = (id) => {
  return async (dispatch, getState) => {
    const token = getState().loggedUser.token;
    await blogs.remove(id, token);
    dispatch(deleteBlog(id));
  };
};

export const updateBlogThunk = (blogToUpdate, newObj) => {
  return async (dispatch) => {
    const id = blogToUpdate.id;
    const updatedBlog = {
      ...blogToUpdate,
      ...newObj,
    };

    await blogs.update(id, updatedBlog);
    dispatch(updateBlog(updatedBlog));
  };
};

export { updateBlogs, createBlog };
export default blogSlice.reducer;
