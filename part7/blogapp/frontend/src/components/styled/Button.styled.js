import styled from "styled-components";

const Button = styled.button`
  background-color: ${(props) =>
    props.main ? props.theme.main.bg_color : props.theme.secondary.bg_color};
  border-radius: 50px;
  border: 1px solid transparent;
  padding: 5px 10px;
  color: ${(props) =>
    props.main
      ? props.theme.main.text_color
      : props.theme.secondary.text_color};
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

Button.Container = Container;

export default Button;
