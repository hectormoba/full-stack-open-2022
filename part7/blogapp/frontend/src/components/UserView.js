import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { isArrayEmpty } from "../utils";

const UserView = () => {
  const { id } = useParams();
  const user = useSelector((state) => {
    const userArray = state.users;
    return userArray.filter((user) => user.id === id)[0];
  });

  if (!user) {
    return null;
  }

  const { blogs, name } = user;

  return (
    <section>
      <h2>{name}</h2>
      {isArrayEmpty(blogs) ? (
        <p>The user has no blogs posted yet</p>
      ) : (
        <ul>
          {blogs.map((blog) => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default UserView;
