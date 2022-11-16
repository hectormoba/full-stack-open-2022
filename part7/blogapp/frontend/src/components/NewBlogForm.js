import { useState } from "react";
import Form from "./styled/Form.styled";
import Button from "./styled/Button.styled";

const NewBlogForm = ({ onCreate }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onCreate({ title, author, url, likes: 0 });
    setAuthor("");
    setTitle("");
    setUrl("");
  };

  return (
    <div>
      <h2>Create new</h2>

      <Form onSubmit={handleSubmit}>
        <Form.InputContainer>
          <Form.Label>title</Form.Label>
          <Form.Input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            id="title"
            placeholder="title of the blog"
          />
        </Form.InputContainer>
        <Form.InputContainer>
          <Form.Label>author</Form.Label>
          <Form.Input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            id="author"
            placeholder="author of the blog"
          />
        </Form.InputContainer>
        <Form.InputContainer>
          <Form.Label>url</Form.Label>
          <Form.Input
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            id="url"
            placeholder="url of the blog"
          />
        </Form.InputContainer>
        <Button main id="create-butto" type="submit">
          create
        </Button>
      </Form>
    </div>
  );
};

export default NewBlogForm;
