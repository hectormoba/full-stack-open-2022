import { connect } from 'react-redux'
import { sendAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {

  const submitAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.sendAnecdote(content)
  }
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={submitAnecdote}>
        <div><input name="anecdote"/></div>
        <button>create</button>
      </form>
    </>
  )
}

const ConnectedAnecdoteForm = connect(
  null,
  { sendAnecdote }
)(AnecdoteForm)

export default ConnectedAnecdoteForm