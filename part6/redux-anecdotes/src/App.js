import AnecdoteForm from './components/AnecdoteForm'
import AnecdotesList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'

const App = () => {

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