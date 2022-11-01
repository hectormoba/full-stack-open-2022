import { useSelector } from "react-redux"
import AnecdoteItem from "./AnecdoteItem"

const AnecdotesList = () => {
  const anecdotes = useSelector( ({ anecdotes }) => 
   [...anecdotes].sort((a, z) => z.votes - a.votes )
  )
  const filterString = useSelector( ({ filter }) => filter)
  return (
    <>
       <h2>Anecdotes</h2>
      {anecdotes
        .filter(anecdote => anecdote.content.includes(filterString))
        .map(anecdote =>
        <AnecdoteItem key={anecdote.id} anecdote={anecdote} />
      )}
    </>
  )
}

export default AnecdotesList