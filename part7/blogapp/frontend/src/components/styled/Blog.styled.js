import styled from "styled-components";
import Form from "./Form.styled";

const BlogView = styled.section`
  width: 70%;
`;

const BlogInput = styled(Form.Input);

BlogView.BlogInput = BlogInput;

export default BlogView;
