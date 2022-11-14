import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../store/slices/usersSlice";
import UserStats from "./UserStats";

const UserList = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <section>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <th>User name</th>
            <th>blogs created</th>
          </tr>
          {users.map((user) => (
            <tr key={user.id}>
              <UserStats user={user} />
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default UserList;
