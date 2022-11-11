export function isUserEmpty(user) {
  return user.token === "";
}

export function findBlogToUpdate(blogs, id) {
  return blogs.find((blog) => blog.id === id);
}
