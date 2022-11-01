import { resetNotificationState } from "../reducers/notificationReducer"
import { useDispatch, useSelector } from "react-redux"
import { isStatePopulated } from "./utils"
import { useEffect, useMemo } from "react"


const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  const dispatch = useDispatch()
  const notification = useSelector(({ notification }) => notification)

  const memoizedValue = useMemo(
    () => isStatePopulated(notification),
    [notification]
  )

  useEffect(() => {
    if(memoizedValue) {
      const timeoutId = setTimeout(() => {
        dispatch(resetNotificationState())
      }, 5000)
      return () => clearTimeout(timeoutId)
    }
  },[memoizedValue, dispatch])

  return (
    memoizedValue
      ? (<div style={style}>
          <p>{` you vote ${notification}`}</p>
        </div>)
      : null
  )
}

export default Notification