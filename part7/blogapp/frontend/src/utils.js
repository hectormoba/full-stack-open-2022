export function isUserEmpty(user) {
  return user.token === "";
}

export function findBlogToUpdate(blogs, id) {
  return blogs.find((blog) => blog.id === id);
}

export function isArrayEmpty(array) {
  return array.length === 0;
}

export function likeOrLikes(likes) {
  return likes === 1 ? "like" : "likes";
}
