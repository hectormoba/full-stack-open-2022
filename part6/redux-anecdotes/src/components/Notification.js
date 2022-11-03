import { connect } from "react-redux"

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  console.log('content:', props.notification.content)
  console.log('timerId:', props.notification.timerId)

  return (
    (props.notification.content !== '' && props.notification.timerId !== '')
      ? (<div style={style}>
          <p>{` you vote ${props.notification.content}`}</p>
        </div>)
      : null
  )
}
const mapStateToProps = (state) => ({
  notification: state.notification
})

const ConnectedNotification = connect(
  mapStateToProps,
  null
)(Notification)

export default ConnectedNotification