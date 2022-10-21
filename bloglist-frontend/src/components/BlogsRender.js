import React from 'react'
import Blog from './Blog'


const BlogsRender = ({ blogs, loggedUsername }) => {

  const styles = {
    blogWrapper: {
      padding: '10px 10vw',
    }
  }
  return (
    <main style={styles.blogWrapper}>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} loggedUsername={loggedUsername}/>
      )}
    </main>
  )
}

export default BlogsRender