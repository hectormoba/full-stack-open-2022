import { NavLink } from "react-router-dom";
import NavBar from "./styled/NavBar.styled";
import Button from "./styled/Button.styled";

const NavList = ({ logout, nameDisplayed }) => {
  return (
    <NavBar>
      <NavBar.List>
        <li>
          <NavLink style={{ textDecoration: "none" }} to="/" end>
            {({ isActive }) => (
              <NavBar.Link isActive={isActive}>Home</NavBar.Link>
            )}
          </NavLink>
        </li>
        <li>
          <NavLink style={{ textDecoration: "none" }} to="/users" end>
            {({ isActive }) => (
              <NavBar.Link isActive={isActive}>Users</NavBar.Link>
            )}
          </NavLink>
        </li>
      </NavBar.List>
      <Button.Container>
        <NavBar.Text>{nameDisplayed} logged in</NavBar.Text>
        <Button onClick={logout}>logout</Button>
      </Button.Container>
    </NavBar>
  );
};

export default NavList;
