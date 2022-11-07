import { useState } from 'react'
import { Route, Routes, useMatch, useNavigate } from 'react-router'
import { initialAnecdotesState, isThereANotification } from './utils'
import About from './components/About'
import CreateNew from './components/CreateNew'
import AnecdoteList from './components/AnecdotList'
import Notification from './components/Notification'
import Footer from './components/Footer'
import Menu from './components/Menu'
import AnecdoteItem from './components/AnecdoteItem'

const App = () => {
  const [anecdotes, setAnecdotes] = useState(initialAnecdotesState)
  const [notification, setNotification] = useState('')
  const navigate = useNavigate()

  const matchRoute = useMatch('/anecdote/:id')
  const anecdote = matchRoute 
    ? anecdotes.find( anecdote => anecdote.id === Number(matchRoute.params.id))
    : null

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(anecdote.content)
    navigate("/")
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Routes>
        <Route path='/anecdote/:id' element={<AnecdoteItem anecdote={anecdote}/>}/>
        <Route 
          path='/' 
          element={
            <>
            {isThereANotification(notification) && <Notification notification={notification} setNotification={setNotification}/>}
              <AnecdoteList anecdotes={anecdotes} />
            </>
           }
          />
        <Route path='/about' element={<About />} />
        <Route path='/create' element={<CreateNew addNew={addNew} />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
