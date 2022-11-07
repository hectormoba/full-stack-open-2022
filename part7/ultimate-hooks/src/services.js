import axios from 'axios'

const getResourceFromDb = async (baseUrl) => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createResource = async (baseUrl, newResource) => {
  const response = await axios.post(baseUrl, newResource)
  return response.data
}

export { getResourceFromDb, createResource}