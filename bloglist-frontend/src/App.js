import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'

import LoginFrom from './components/LogInForm'
import BlogsRender from './components/BlogsRender'
import CreateBlogForm from './components/CreateBlogForm'
import ActionMessage from './components/ActionMessage'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [showMessage, setShowMessage] = useState(false)
  const [messageType, setMesageType] = useState('')
  const [message, setMessage] = useState('')
  const [createFormIsOpen, setCreateFormIsOpen] = useState(false)


  useEffect(() => {

    const getBlogsAndSort = async () => {

      const res = await blogService.getAll()
      const sortedBlogs = [...res].sort( (a, z) => z.likes - a.likes)
      setBlogs(sortedBlogs)
    }

    getBlogsAndSort()
  }, [])

  useEffect(() => {
    const userInLocalStorage = localStorage.getItem('user')

    if (userInLocalStorage) {
      const user = JSON.parse(userInLocalStorage)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      let user = await loginService.login(username, password)
      setUser(user)
      blogService.setToken(user.token)
      setPassword('')
      setUsername('')
      localStorage.setItem('user', JSON.stringify(user))
    } catch (error) {
      setShowMessage(true)
      setMessage(error.response.data.error)
      setMesageType('error')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    setUser(null)
  }

  const sendBlogInfo = async (title, author, url) => {
    try {
      let response = await blogService.createBlog({ title, author, url })
      if (response.status === 201) {
        let updatedBlogs = await blogService.getAll()
        setShowMessage(true)
        setMesageType('succeeded')
        setMessage(title)
        setBlogs(updatedBlogs)
        setCreateFormIsOpen(false)
      }
    } catch(error) {
      setShowMessage(true)
      setMessage(error.response.data.error)
      setMesageType('error')
    }
  }

  return (
    <div>
      <ActionMessage
        message={message}
        type={messageType}
        showMessage={showMessage}
        setShowMessage={setShowMessage}
      />
      { user === null
        ? <LoginFrom
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
        : (
          <>
            <span>{user.username} is logged in</span>{' '}
            <button onClick={handleLogout}>Logout</button>
            <h2>blogs</h2>
            <CreateBlogForm
              sendBlogInfo={sendBlogInfo}
              isOpen={createFormIsOpen}
              handleOpen={setCreateFormIsOpen}
            />
            <BlogsRender
              blogs={blogs}
              loggedUsername={user.username}
            />
          </>
        )
      }
    </div>
  )
}

export default App
