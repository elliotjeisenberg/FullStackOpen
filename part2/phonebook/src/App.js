import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import phonebookServices from './services/phonebook'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    phonebookServices
    .getPhonebook()
    .then(res => {
      setPersons(res)
    })
    .catch(err => {
      console.log(err)
    })
  },[])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    const search = persons.find(person => person.name === newName)
    if (search) {
      if (window.confirm(`${newName} is already in the phonebook. Do you want to update this record with the new number?`)) {
        phonebookServices
        .updatePerson(search.id, {name:search.name, number:newNumber})
        .then(res => {
          setPersons(persons.map(person => person.id !== search.id ? person : res))
        })
        }
    }
    else { 
      const newPerson = {
        name: newName,
        number: newNumber
      }

      phonebookServices
      .addPerson(newPerson)
      .then(res => {
        setPersons(persons.concat(res))
        setNewName('')
        setNewNumber('')
      })
    }
  }

  const deleteName = id => {
    const x = persons.find( person => person.id === id )
    console.log(x)
    if (window.confirm(`Do you really want to delete ${x.name}?`)) {
    phonebookServices
    .deletePerson(id)
    .then(res => {
      setPersons(persons.filter(person => person.id !== id))
    })
  }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilter={handleFilter} filter={filter} text={'filter by name'}/>
      <h3>Add a new</h3>
      <PersonForm 
        addName={addName} 
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange} 
        newName={newName} 
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} deleteName={deleteName}/>
    </div>
  )
}

export default App