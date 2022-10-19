import React from "react";
import Blog from "./Blog";


const BlogsRender = ({blogs, handleLogout, user}) => {
  return (
    <>
      <button onClick={handleLogout}>Logout</button>
      <p>{user.username} is logged in</p>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </>
  )
}

export default BlogsRender