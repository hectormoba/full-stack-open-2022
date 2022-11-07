import { useField } from '../hooks'
import { substractProps } from '../hooks'

const CreateNew = (props) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')


  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
  }

  const hadleClickOnReset = () => {
    content.resetValue()
    author.resetValue()
    info.resetValue()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...substractProps(content, "resetValue")} />
        </div>
        <div>
          author
          <input {...substractProps(author, "resetValue")}/>
        </div>
        <div>
          url for more info
          <input {...substractProps(info, "resetValue")} />
        </div>
        <button>create</button>
      </form>
        <button onClick={hadleClickOnReset}>reset</button>
    </div>
  )

}

export default CreateNew