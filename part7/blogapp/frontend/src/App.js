import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet } from "react-router";
import { isUserEmpty } from "./utils";
import {
  storeUserInfo,
  getUserAndUpdateState,
} from "./store/slices/loggedUserSlice";
import {
  pushNotification,
  resetNotification,
} from "./store/slices/notificationSlice";
import loginService from "./services/login";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import NavList from "./components/NavList";

const App = () => {
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.loggedUser);

  useEffect(() => {
    dispatch(getUserAndUpdateState());
  }, [dispatch]);

  const login = async (username, password) => {
    try {
      const loggedUser = await loginService.login({ username, password });
      dispatch(storeUserInfo(loggedUser));
      notify(`${loggedUser.name} logged in!`);
    } catch (error) {
      notify("wrong username/password", "alert");
    }
  };

  const notify = (message, type = "info") => {
    dispatch(pushNotification({ message, type }));
    setTimeout(() => {
      dispatch(resetNotification());
    }, 5000);
  };

  if (isUserEmpty(loggedUser)) {
    return (
      <>
        <Notification />
        <LoginForm onLogin={login} />
      </>
    );
  }

  return (
    <>
      <NavList />
      <Outlet />
    </>
  );
};

export default App;
