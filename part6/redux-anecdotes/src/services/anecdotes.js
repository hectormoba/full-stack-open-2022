import axios from "axios";
import { getId } from "../reducers/utils";

const URL = 'http://localhost:3003/anecdotes'

const getAnecdotes = async () => {
  const response = await axios.get(URL)
  return response.data
}

const createNew = async (payload) => {
  const anecdoteObj = {
    content: payload,
    id: getId(),
    votes: 0
  }
  const response = await axios.post(URL, anecdoteObj)

  return response.data
}


const voteAnAnecdote = async (anecdote) => {
  const { id, votes } = anecdote 
  const votedAnecdote = { ...anecdote, votes: votes + 1 }
  const response = await axios.patch(`${URL}/${id}`, votedAnecdote)

  return response.data
}

export { getAnecdotes, createNew, voteAnAnecdote }