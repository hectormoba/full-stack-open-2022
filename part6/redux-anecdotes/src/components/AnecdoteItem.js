import { useDispatch } from "react-redux"
import { setNotification } from "../reducers/notificationReducer"
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
        dispatch(setNotification(content, 5))
      }}>vote</button>
    </div>
  </div>
  )
}

export default AnecdoteItem