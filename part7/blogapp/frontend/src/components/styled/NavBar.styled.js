import styled from "styled-components";

const NavBar = styled.nav`
  display: flex;
  padding: 0 10px;
  background-color: ${(props) => props.theme.main.bg_color};
  justify-content: space-between;
`;

const List = styled.ul`
  display: flex;
  flex-direction: row;
  gap: 10px;
  list-style: none;
  padding: 0;
`;

const Text = styled.span`
  color: white;
`;

const Link = styled.p`
  color: white;
  text-decoration: ${(props) =>
    props.isActive ? "white wavy underline" : "none"};
  margin: 0;
  &:visited {
    color: white;
  }
  &:hover {
    transform: scale(0.9);
  }
`;

NavBar.List = List;
NavBar.Text = Text;
NavBar.Link = Link;

export default NavBar;
