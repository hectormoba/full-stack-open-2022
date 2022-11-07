import axios from 'axios'

const getCountry = async (name) => {
  const response = await axios.get(requestStringsCreator.getOneCountry(name))

  return response.status !== 404 ? response.data[0] : null
}

const requestStringsCreator = {
  getOneCountry: (name) => `https://restcountries.com/v3.1/name/${name}?fullText=true`
}


const countryService = { getCountry }

export default countryService
