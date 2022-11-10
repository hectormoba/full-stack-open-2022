import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  pushNotification,
  resetNotification,
} from "./store/slices/notificationSlice";
import {
  fetchBlogs,
  createBlogThunk,
  deleteBlogById,
} from "./store/slices/blogsSlice";
import {
  storeUserInfo,
  getUserAndUpdateState,
  deleteStoredUserInfo,
} from "./store/slices/userSlice";
import { isUserEmpty } from "./utils";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import NewBlogForm from "./components/NewBlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const blogs = useSelector((state) => state.blogs);
  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUserAndUpdateState());
  }, []);

  const login = async (username, password) => {
    try {
      const loggedUser = await loginService.login({ username, password });
      dispatch(storeUserInfo(loggedUser));
      notify(`${loggedUser.name} logged in!`);
    } catch (error) {
      notify("wrong username/password", "alert");
    }
  };

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

  const likeBlog = async (id) => {
    const toLike = blogs.find((b) => b.id === id);
    const liked = {
      ...toLike,
      likes: (toLike.likes || 0) + 1,
      user: toLike.user.id,
    };

    blogService.update(liked.id, liked).then((updatedBlog) => {
      notify(`you liked '${updatedBlog.title}' by ${updatedBlog.author}`);
      // const updatedBlogs = blogs
      // .map((b) => (b.id === id ? updatedBlog : b))
      // .sort(byLikes);
      // setBlogs(updatedBlogs);
    });
  };

  const notify = (message, type = "info") => {
    dispatch(pushNotification({ message, type }));
    setTimeout(() => {
      dispatch(resetNotification());
    }, 5000);
  };

  if (isUserEmpty(user)) {
    return (
      <>
        <Notification />
        <LoginForm onLogin={login} />
      </>
    );
  }

  return (
    <div>
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
    </div>
  );
};

export default App;
