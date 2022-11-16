import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs, createBlogThunk } from "../store/slices/blogsSlice";
import { Link } from "react-router-dom";
import { notify } from "../store/utils";
import NewBlogForm from "./NewBlogForm";
import {
  InnerOutletContainer,
  BlogListElementContainer,
  BlogListContainer,
} from "./styled/Containers.styled";
import Togglable from "./Togglable";

const BlogList = () => {
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
    <InnerOutletContainer>
      <h2>Blogs</h2>
      <Togglable buttonLabel="new note" ref={blogFormRef}>
        <NewBlogForm onCreate={createBlog} />
      </Togglable>
      <BlogListContainer id="blogs">
        {blogs.map((blog) => {
          return (
            <BlogListElementContainer key={blog.id}>
              <Link
                to={`/blogs/${blog.id}`}
              >{`${blog.title} by ${blog.author}`}</Link>
            </BlogListElementContainer>
          );
        })}
      </BlogListContainer>
    </InnerOutletContainer>
  );
};

export default BlogList;
