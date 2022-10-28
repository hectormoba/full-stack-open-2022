import React from 'react'
import Blog from './Blog'


const BlogsRender = ({ blogs, loggedUsername, reloadBlogList }) => {

  const styles = {
    blogWrapper: {
      padding: '10px 10vw',
    }
  }
  return (
    <main style={styles.blogWrapper}>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          loggedUsername={loggedUsername}
          reloadBlogList={reloadBlogList}
        />
      )}
    </main>
  )
}

export default BlogsRender