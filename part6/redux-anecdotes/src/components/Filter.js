import { useDispatch } from "react-redux"
import { filterList } from "../reducers/filterReducer"

const Filter = () => {

  const dispatch = useDispatch()

  const handleChange = (event) => {
    const input = event.target.value
    dispatch(filterList(input))
  }

  const styles = {
    container: {
      margin: '10px 0'
    }
  }
  return (
    <div style={styles.container}>
      <label>
        filter {' '} 
        <input onChange={handleChange}/>
      </label>
    </div>
  )
}

export default Filter