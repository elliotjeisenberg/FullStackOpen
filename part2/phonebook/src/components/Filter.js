const Filter = (props) => {
    return (
      <div>
        {props.text} <input onChange={props.handleFilter} value={props.filter}/>
      </div>
    )
    }

    export default Filter