import { anecdotesAtStart } from "./utils"
import { createSlice } from "@reduxjs/toolkit"

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}
const initialState = anecdotesAtStart.map(asObject)

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: initialState,
  reducers: {
    vote(state, action) {
      const id = action.payload
      const anecdote = state.find(element => element.id === id)
      const updatedAnecdote = {
        ...anecdote,
        votes: anecdote.votes + 1
      }
      return state.map( anecdote => 
        anecdote.id !== id ? anecdote : updatedAnecdote  
      ) 
    },
    addAnecdote(state, action){
      state.push({
        content: action.payload,
        id: getId(),
        votes: 0
      })
    }
  }
})


export const { vote, addAnecdote } = anecdotesSlice.actions
export default anecdotesSlice.reducer