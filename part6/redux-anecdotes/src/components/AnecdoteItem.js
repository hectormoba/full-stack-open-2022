import { useDispatch } from "react-redux"
import { displayNotification } from "../reducers/notificationReducer"
import { vote } from '../reducers/anecdoteReducer'

const AnecdoteItem = ({ anecdote }) => {
  const { id, votes, content } = anecdote 
  const dispatch = useDispatch()

  return (
  <div>
    <div>
      {content}
    </div>
    <div>
      has {votes}
      <button onClick={() => {
        dispatch(vote(id))
        dispatch(displayNotification(content))
      }}>vote</button>
    </div>
  </div>
  )
}

export default AnecdoteItem