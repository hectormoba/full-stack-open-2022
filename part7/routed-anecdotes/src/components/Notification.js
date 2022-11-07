import { useEffect } from 'react'

const Notification = ({ setNotification, notification }) => {
  const styles = {
    container: {
      margin: '10px 0',
      borderRadius: '5px',
      border: '1px solid black'
    }
  }

  useEffect(() => {
    let timerId = setTimeout(() => {
      setNotification('')
    }, 5000)

    return () => clearTimeout(timerId)
  },[setNotification])

  return (
    <div style={styles.container}>
      <p>{`A new anocdote was added: ${notification}`}</p>
    </div>
  )
}

export default Notification