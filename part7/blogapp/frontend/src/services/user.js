const STORAGE_KEY = "loggedBlogAppUser";

const setUser = (user) => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
};

const getUser = () => {
  const loggedUserJSON = window.localStorage.getItem(STORAGE_KEY);
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON);
    return user;
  }

  return null;
};

const clearUser = () => {
  localStorage.clear();
};

export default {
  setUser,
  getUser,
  clearUser,
};
