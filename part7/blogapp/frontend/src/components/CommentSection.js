import { useState } from "react";
import { isArrayEmpty } from "../utils";
import Form from "./styled/Form.styled";
import Button from "./styled/Button.styled";

const CommentSection = ({ addComment, comments }) => {
  const [input, setInput] = useState("");

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };
  const handleClick = () => {
    addComment(input);
  };
  return (
    <div>
      <h3>Comments</h3>
      <Form.Input value={input} onChange={handleInputChange} />
      <Button onClick={handleClick}>Add comment</Button>
      {isArrayEmpty(comments) ? (
        <p>There's no comments yet</p>
      ) : (
        <ul>
          {comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CommentSection;
