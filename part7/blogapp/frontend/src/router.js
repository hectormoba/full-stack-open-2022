import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import BlogList from "./components/BlogList";
import UserList from "./components/UserList";
import UserView from "./components/UserView";
import App from "./App";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route path="/" element={<BlogList />} />
        <Route path="users" element={<UserList />} />
        <Route path="user/:id" element={<UserView />} />
      </Route>
    </>
  )
);
