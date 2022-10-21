import React, { useState } from 'react'

const CreateBlogForm = ({ sendBlogInfo, isOpen, handleOpen }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const resetFormState = () => {
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  const handleOpenForm = () => handleOpen(!isOpen)

  return (
    isOpen === true
      ?  (
        <>
          <form onSubmit={(event) => {
            event.preventDefault()
            sendBlogInfo(title, author, url)
            resetFormState()}}
          style={{ display: 'flex', flexDirection: 'column', maxWidth: '300px', gap: '5px' }}>
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
          <button onClick={handleOpenForm}>close</button>
        </>
      ) : (
        <button onClick={handleOpenForm}>open</button>
      )
  )
}

export default CreateBlogForm