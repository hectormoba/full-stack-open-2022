import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet } from "react-router";
import { isUserEmpty } from "./utils";
import {
  storeUserInfo,
  getUserAndUpdateState,
  deleteStoredUserInfo,
} from "./store/slices/loggedUserSlice";
import { notify } from "./store/utils";
import loginService from "./services/login";
import { OutletContainer } from "./components/styled/Containers.styled";
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
      notify(dispatch, `${loggedUser.name} logged in!`);
    } catch (error) {
      notify(dispatch, "wrong username/password", "alert");
    }
  };

  const logout = () => {
    dispatch(deleteStoredUserInfo());
    notify(dispatch, "good bye!");
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
      <NavList nameDisplayed={loggedUser.name} logout={logout} />
      <Notification />
      <OutletContainer>
        <Outlet />
      </OutletContainer>
    </>
  );
};

export default App;
