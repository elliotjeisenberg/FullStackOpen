const Persons = (props) => {
    return (
      <ul>
        {
          props.persons.filter(person => {
            return person.name.toUpperCase().includes(props.filter.toUpperCase())
          })
          .map(person => {
            return <li key={person.name}>Name: {person.name} Number {person.number} <button onClick={() => props.deleteName(person.id)}>delete</button></li>
          })
        }
      </ul>
    )
  }

  export default Persons