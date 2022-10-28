import React, { useState } from 'react'

const CreateBlogForm = ({ sendBlogInfoAndReload, isOpen, handleOpen }) => {
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
            sendBlogInfoAndReload(title, author, url)
            resetFormState()}}
          style={{ display: 'flex', flexDirection: 'column', maxWidth: '300px', gap: '5px' }}>
            <label>
              title
              <input
                name='title'
                value={title}
                onChange={({ target }) => setTitle(target.value)}
              />
            </label>
            <label>
              author
              <input
                name='author'
                value={author}
                onChange={ ({ target }) => setAuthor(target.value)}
              />
            </label>
            <label>
              url
              <input
                name='url'
                value={url}
                onChange={ ({ target }) => setUrl(target.value)}
              />
            </label>
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