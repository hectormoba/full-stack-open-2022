import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs, createBlogThunk } from "../store/slices/blogsSlice";
import { Link } from "react-router-dom";
import { notify } from "../store/utils";
import NewBlogForm from "./NewBlogForm";
import Togglable from "./Togglable";

const BlogList = () => {
  const style = {
    padding: "8px 5px",
    margin: 5,
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 5,
  };

  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  const createBlog = (blog) => {
    try {
      dispatch(createBlogThunk(blog));
      notify(dispatch, `a new blog '${blog.title}' by ${blog.author} added`);
      blogFormRef.current.toggleVisibility();
    } catch (error) {
      notify(
        dispatch,
        "creating a blog failed: " + error.response.data.error,
        "alert"
      );
    }
  };

  return (
    <>
      <Togglable buttonLabel="new note" ref={blogFormRef}>
        <NewBlogForm onCreate={createBlog} />
      </Togglable>
      <div id="blogs">
        {blogs.map((blog) => {
          return (
            <div style={style} key={blog.id}>
              <Link
                to={`/blogs/${blog.id}`}
              >{`${blog.title} by ${blog.author}`}</Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default BlogList;
