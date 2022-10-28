import PropTypes from 'prop-types'
import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, loggedUsername, handleClickInProps, reloadBlogList }) => {

  const { title, author, likes, url, id, user } = blog

  const [isOpen, setIsOpen] = useState(false)
  const [likeCount, setLikeCount] = useState(null)

  const styles = {
    blog: {
      borderRadius: '5px',
      border: '1px solid black',
      boxSizing: 'border-box',
      padding: '5px',
    },
    withButton: {
      display: 'flex',
      gap: '10px'
    },
    button: {
      alignSelf: 'center'
    }
  }

  const likeDisplayed = likeCount ?? likes

  const handleToggleSection = () => {
    setIsOpen(!isOpen)
  }

  const handleLikeClick =  async () => {
    try {
      const res = await blogService.updateBlog({ title, author, url, likes: likeDisplayed + 1 }, id)

      if(res.status === 201) {
        const blogResponse = await blogService.getOne(id)
        setLikeCount(blogResponse.data.likes)
      }

    } catch(error) {
      console.log('ERROR on blog:', error)
    }
  }

  const handleDelete = async () => {
    const message = `Remove ${title}?`
    const confirmation = window.confirm(message)

    if(confirmation) {
      await blogService.deleteBlog(id)
      reloadBlogList(true)
    }
  }

  return (
    <section style={styles.blog}>
      <div style={styles.withButton}>
        <p>{title}</p>
        <p>{author}</p>
        <button
          onClick={handleToggleSection}
          style={styles.button}
        >
          {isOpen ? 'hide' : 'view'}
        </button>
      </div>
      {isOpen && (
        <article>
          <p>{url}</p>
          <div style={styles.withButton}>
            <p>{`Likes ${likeDisplayed}`}</p>
            <button style={styles.button} onClick={handleClickInProps ?? handleLikeClick}>like</button>
          </div>
          <p>{user.username}</p>
          {loggedUsername === user.username && <button onClick={handleDelete}>delete</button>}
        </article>
      )}

    </section>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  loggedUsername: PropTypes.string.isRequired
}

export default Blog