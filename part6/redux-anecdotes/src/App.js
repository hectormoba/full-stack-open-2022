import AnecdoteForm from './components/AnecdoteForm'
import AnecdotesList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'
import { initializeAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes())
  },[dispatch])

  return (
    <div>
      <Notification />
      <Filter /> 
      <AnecdotesList />
      <AnecdoteForm />
    </div>
  )
}

export default App