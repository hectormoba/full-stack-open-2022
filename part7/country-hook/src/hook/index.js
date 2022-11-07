import { useState, useEffect } from 'react'
import countryService from '../services/country'

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  const [queryString, setQueryString] = useState(name)

  const changeQueryString = (value) => {
    setQueryString(value)
  }

  useEffect(() => {
    if(!queryString) {
      return
    }

    const searchCountry = async () => {
      const response = await countryService.getCountry(queryString)
      setCountry(response)
    }
    
    searchCountry()

  },[queryString])

  return [country, changeQueryString]
 }