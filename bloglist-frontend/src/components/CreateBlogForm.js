import React, {useState} from "react";

const CreateBlogForm = ({ sendBlogInfo }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const resetFormState = () => {
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return (
    <form onSubmit={(event) => {
      event.preventDefault()
      sendBlogInfo(title, author, url)
      resetFormState()
    }}>
      <label htmlFor='title'>title</label>
      <input 
        name='title'
        value={title}
        onChange={ ({ target }) => setTitle(target.value)}
      />
      <label htmlFor='author'>author</label>
      <input 
        name='author'
        value={author}
        onChange={ ({ target }) => setAuthor(target.value)}
      />
      <label htmlFor='url'>url</label>
      <input 
        name='url'
        value={url}
        onChange={ ({ target }) => setUrl(target.value)}
      />
      <button>Create new blog</button>
    </form>
  )
}

export default CreateBlogForm