import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  pushNotification,
  resetNotification,
} from "../store/slices/notificationSlice";
import {
  fetchBlogs,
  createBlogThunk,
  deleteBlogById,
  updateBlogThunk,
} from "../store/slices/blogsSlice";
import { deleteStoredUserInfo } from "../store/slices/loggedUserSlice";
import { findBlogToUpdate } from "../utils";
import Blog from "./Blog";
import NewBlogForm from "./NewBlogForm";
import Notification from "./Notification";
import Togglable from "./Togglable";

const BlogList = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.loggedUser);
  const blogs = useSelector((state) => state.blogs);
  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  const logout = () => {
    dispatch(deleteStoredUserInfo());
    notify("good bye!");
  };

  const createBlog = (blog) => {
    try {
      dispatch(createBlogThunk(blog));
      notify(`a new blog '${blog.title}' by ${blog.author} added`);
      blogFormRef.current.toggleVisibility();
    } catch (error) {
      notify("creating a blog failed: " + error.response.data.error, "alert");
    }
  };

  const removeBlog = (id) => {
    const toRemove = blogs.find((b) => b.id === id);

    const ok = window.confirm(
      `remove '${toRemove.title}' by ${toRemove.author}?`
    );

    if (!ok) {
      return;
    }

    dispatch(deleteBlogById(id));
  };

  const likeBlog = (id) => {
    const blogToUpdate = findBlogToUpdate(blogs, id);
    const fieldToUpdate = { likes: blogToUpdate.likes + 1 };
    dispatch(updateBlogThunk(blogToUpdate, fieldToUpdate));
    dispatch(fetchBlogs());
    notify(`you liked '${blogToUpdate.title}' by ${blogToUpdate.author}`);
  };

  const notify = (message, type = "info") => {
    dispatch(pushNotification({ message, type }));
    setTimeout(() => {
      dispatch(resetNotification());
    }, 5000);
  };

  return (
    <>
      <h2>blogs</h2>
      <Notification />
      <div>
        {user.name} logged in
        <button onClick={logout}>logout</button>
      </div>
      <Togglable buttonLabel="new note" ref={blogFormRef}>
        <NewBlogForm onCreate={createBlog} />
      </Togglable>
      <div id="blogs">
        {blogs.map((blog) => {
          return (
            <Blog
              key={blog.id}
              blog={blog}
              likeBlog={likeBlog}
              removeBlog={removeBlog}
              user={user}
            />
          );
        })}
      </div>
    </>
  );
};

export default BlogList;
