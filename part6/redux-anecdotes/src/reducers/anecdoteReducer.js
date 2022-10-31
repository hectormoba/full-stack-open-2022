import { anecdotesAtStart } from "./utils"

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
  
  switch (action.type) {
    case 'NEW_ANECDOTE': 
      return state.concat(action.payload)
    case 'VOTE': {
      const id = action.payload.id
      const anecdote = state.find(element => element.id === id)
      const updatedAnecdote = {
        ...anecdote,
        votes: anecdote.votes + 1
      }
      return state.map( anecdote => 
        anecdote.id !== id ? anecdote : updatedAnecdote  
      )
    } 
    default: return state
  }

}

export const vote = (id) => {
  return {
    type: 'VOTE',
    payload: {
      id
    }
  }
}

export const addAnecdote = (anecdote) => {
return {
  type: 'NEW_ANECDOTE',
  payload: {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}
}

export default reducer