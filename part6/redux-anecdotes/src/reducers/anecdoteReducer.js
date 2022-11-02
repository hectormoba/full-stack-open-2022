import { createSlice } from "@reduxjs/toolkit"
import { getAnecdotes, createNew, voteAnAnecdote } from "../services/anecdotes"

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote(state, action) {
      const updatedAnecdote = action.payload
      const { id } = updatedAnecdote

      return state.map( anecdote => 
        anecdote.id !== id ? anecdote : updatedAnecdote 
      ) 
    },
    addAnecdote(state, action){ 
      state.push(action.payload)
    },
    addAnecdotesFromServer(state, action){
      return action.payload
    }
  }
})


export const { vote, addAnecdote, addAnecdotesFromServer } = anecdotesSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotesInDb = await getAnecdotes()
    dispatch(addAnecdotesFromServer(anecdotesInDb))
  }
}

export const sendAnecdote = (content) => {
  return async dispatch => {
    const response = await createNew(content)
    dispatch(addAnecdote(response))
  }
}

export const upvoteAnAnecdote = (content) => {
  return async dispatch => {
    const response = await voteAnAnecdote(content)
    dispatch(vote(response))
  }
}


export default anecdotesSlice.reducer