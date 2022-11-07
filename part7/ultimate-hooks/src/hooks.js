import { useCallback, useEffect, useState } from "react"
import { getResourceFromDb, createResource } from "./services"

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])


  useEffect(() => {
    const getResources = async () => {
      const response = await getResourceFromDb(baseUrl)
      setResources(response)
    }

    getResources()
  },[baseUrl])

  
  const create = async (resource) => {
    const response = await createResource(baseUrl, resource)
    return response.data
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}