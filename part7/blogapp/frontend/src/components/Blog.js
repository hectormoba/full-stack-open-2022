import { useSelector, useDispatch } from "react-redux";
import { updateBlogThunk, addACommentThunk } from "../store/slices/blogsSlice";
import { useParams } from "react-router";
import { notify } from "../store/utils";
import { likeOrLikes } from "../utils";
import CommentSection from "./CommentSection";
import { InnerOutletContainer } from "./styled/Containers.styled";
import Button from "./styled/Button.styled";

const Blog = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const blog = useSelector((state) => {
    const blogsArrray = state.blogs;
    return blogsArrray.filter((blog) => blog.id === id)[0];
  });

  const likeBlog = () => {
    const fieldToUpdate = { likes: blog.likes + 1 };
    dispatch(updateBlogThunk(blog, fieldToUpdate));
    notify(dispatch, `you liked '${blog.title}' by ${blog.author}`);
  };

  const addComment = (input) => {
    dispatch(
      addACommentThunk({
        comment: input,
        blog,
      })
    );
  };

  if (!blog) {
    return null;
  }

  const { title, author, likes, url, comments, user } = blog;

  return (
    <InnerOutletContainer>
      <h2>{title}</h2>
      <h3>by {author}</h3>
      <p>{url}</p>
      <Button.Container>
        <span>
          {likes} {likeOrLikes(likes)}
        </span>
        <Button secondary onClick={likeBlog}>
          like
        </Button>
      </Button.Container>
      <p>added by {user ? user.name : "no user"}</p>
      <CommentSection addComment={addComment} comments={comments} />
    </InnerOutletContainer>
  );
};

export default Blog;
