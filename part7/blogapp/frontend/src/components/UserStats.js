import { Link } from "react-router-dom";

const totalOfBlogs = (user) => user.blogs.length;

const UserStats = ({ user }) => {
  return (
    <>
      <td>
        <Link to={`/user/${user.id}`}>{user.username}</Link>
      </td>
      <td>{totalOfBlogs(user)}</td>
    </>
  );
};

export default UserStats;
