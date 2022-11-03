import { connect } from "react-redux"
import { filterList } from "../reducers/filterReducer"

const Filter = (props) => {

  const handleChange = (event) => {
    const input = event.target.value
    props.filterList(input)
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


const ConnectedFilter = connect(
  null,
  { filterList }
)(Filter)

export default ConnectedFilter