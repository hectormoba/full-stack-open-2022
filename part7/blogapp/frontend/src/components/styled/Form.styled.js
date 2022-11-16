import styled from "styled-components";

const Form = styled.form`
  margin-bottom: 10px;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: left;
  margin-bottom: 10px;
`;

const Label = styled.span`
  min-width: 60px;
  justify-self: center;
  font-weight: 500;
`;

const Input = styled.input`
  height: 20%;
  border: none;
  background-color: ${(props) => props.theme.input.bg_color};
  border-bottom: ${(props) => props.theme.input.border};
  padding: 5px 8px;
  &:focus-visible {
    outline: none;
    background-color: ${(props) => props.theme.input.onFocus.bg_color};
    border-bottom: ${(props) => props.theme.input.onFocus.border};
  }
`;

Form.InputContainer = InputContainer;
Form.Label = Label;
Form.Input = Input;

export default Form;
