import { votesInPlural } from "../utils"

const AnecdoteItem = ({ anecdote }) => {
  const {content, author, info, votes} = anecdote
  return (
    <section>
      <h2>{`${content} by ${author}`}</h2>
      <p>{`has ${votes} ${votesInPlural(votes)}`}</p>
      <p>{`more info: ${info}`}</p>
    </section>
  )
}

export default AnecdoteItem