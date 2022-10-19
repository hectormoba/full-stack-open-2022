import React, {useEffect} from 'react'

const ActionMessage = ({ type, message, showMessage, setShowMessage }) => {

  useEffect(() => {
    const timerId = setTimeout(() => setShowMessage(false), 3000)
    return () => clearTimeout(timerId)
  },[showMessage])

  const styles = {
    container : {
      border: '2px',
      borderStyle: 'solid',
      borderRadius: '5px',
      padding: '10px',
      borderColor: type === 'error' ? 'red' : 'green',
      backgroundColor: '#c2ccc5'
    },
    text: {
      color: type === 'error' ? 'red' : 'green'
    }
  }

  if(!showMessage) return null

  return (
    <div style={styles.container}>
      {type === 'error' && <p style={styles.text}>{`${message}. Please try again`}</p>}
      {type === 'succeeded' && <p style={styles.text}>{`Blog ${message} was created successfully`}</p>}
    </div>
  )
}

export default ActionMessage