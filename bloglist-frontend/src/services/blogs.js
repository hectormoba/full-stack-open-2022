import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = responseToken => {
  token = `bearer ${responseToken}`
} 

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createBlog = async (data) => {
  const res =  await axios.post(
    baseUrl, 
    data, 
    { headers: 
      { 'Authorization': token}
    }
  )
  return res
}

const blogService = { getAll, setToken, createBlog }

export default blogService