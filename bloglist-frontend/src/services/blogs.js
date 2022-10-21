import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = responseToken => {
  token = `bearer ${responseToken}`
}

const setHeader = () => {
  return { 'Authorization': token }
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getOne = async (blogId) => {
  const url = `${baseUrl}/${blogId}`
  const res = await axios.get(url)

  return res
}

const createBlog = async (data) => {
  const res =  await axios.post(
    baseUrl,
    data,
    { headers: setHeader() }
  )
  return res
}

const updateBlog = async (data, blogId) => {
  const url = `${baseUrl}/${blogId}`
  const res = await axios.put(
    url,
    data,
    { headers: setHeader() }
  )
  return res
}

const deleteBlog = async (blogId) => {
  const url = `${baseUrl}/${blogId}`
  const res = await axios.delete(url)

  return res
}


const blogService = { getAll, getOne, setToken, createBlog, updateBlog, deleteBlog }

export default blogService