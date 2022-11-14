import { useState } from "react";
import { isArrayEmpty } from "../utils";

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
      <input value={input} onChange={handleInputChange}></input>
      <button onClick={handleClick}>Add comment</button>
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
