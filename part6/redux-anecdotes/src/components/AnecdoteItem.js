import { useDispatch } from "react-redux"
import { displayNotification } from "../reducers/notificationReducer"
import { upvoteAnAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteItem = ({ anecdote }) => {
  const { votes, content } = anecdote 
  const dispatch = useDispatch()

  return (
  <div>
    <div>
      {content}
    </div>
    <div>
      has {votes}
      <button onClick={() => {
        dispatch(upvoteAnAnecdote(anecdote))
        dispatch(displayNotification(content))
      }}>vote</button>
    </div>
  </div>
  )
}

export default AnecdoteItem