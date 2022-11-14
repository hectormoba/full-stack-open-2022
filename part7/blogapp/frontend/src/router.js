import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import BlogList from "./components/BlogList";
import UserList from "./components/UserList";
import UserView from "./components/UserView";
import Blog from "./components/Blog";
import App from "./App";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route path="/" element={<BlogList />} />
        <Route path="users" element={<UserList />} />
        <Route path="user/:id" element={<UserView />} />
        <Route path="blogs/:id" element={<Blog />} />
      </Route>
    </>
  )
);
