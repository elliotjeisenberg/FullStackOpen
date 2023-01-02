import {
  useEffect,
  useState
} from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import phonebookServices from './services/phonebook'
import Notification from './components/Notification'
import './index.css'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')
    const [notification, setNotification] = useState({
      message: null,
      type: null
    })

    useEffect(() => {
      phonebookServices
        .getPhonebook()
        .then(res => {
          setPersons(res)
        })
        .catch(err => {
          console.log(err)
        })
    }, [])

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
            .updatePerson(search.id, {
              name: search.name,
              number: newNumber
            })
            .then(res => {
              setPersons(persons.map(person => person.id !== search.id ? person : res))
              setNotification({
                message: `${search.name} was updated with a new number`,
                type: 'neutral'
              })
              setNewName('')
              setNewNumber('')
              setTimeout(() => {
                setNotification({
                  message: null,
                  type: null
                })
              }, 3000)
            })
            .catch(res => {
              if (res.response.data.error.includes('Validation failed')) {
                setNotification({
                  message: `Both name and number need to be filled out`,
                  type: 'error'
                })
                setTimeout(() => {
                  setNotification({
                    message: null,
                    type: null
                  })
                }, 3000)
              } else {
                setPersons(persons.filter(person => person.id !== search.id))
                setNotification({
                  message: `User has already been delted from the server`,
                  type: 'error'
                })
                setTimeout(() => {
                  setNotification({
                    message: null,
                    type: null
                  })
                }, 3000)
              }
            })
        }
      } else {
        const newPerson = {
          name: newName,
          number: newNumber
        }

        phonebookServices
          .addPerson(newPerson)
          .then(res => {
            setPersons(persons.concat(res))
            setNotification({
              message: `${newPerson.name} was added to the phonebook`,
              type: 'neutral'
            })
            setTimeout(() => {
              setNotification({
                message: null,
                type: null
              })
            }, 3000)
            setNewName('')
            setNewNumber('')
          })
      }
    }

    const deleteName = id => {
      const x = persons.find(person => person.id === id)
      if (window.confirm(`Do you really want to delete ${x.name}?`)) {
        phonebookServices
          .deletePerson(id)
          .then(res => {
            setPersons(persons.filter(person => person.id !== id))
            setNotification({
              message: `${x.name} was deleted from the phonebook`,
              type: 'neutral'
            })
            setTimeout(() => {
              setNotification({
                message: null,
                type: null
              })
            }, 3000)
          })
          .catch(res => {
            setPersons(persons.filter(person => person.id !== id))
            setNotification({
              message: `User has already been delted from the server`,
              type: 'error'
            })
            setTimeout(() => {
              setNotification({
                message: null,
                type: null
              })
            }, 3000)
          })
      }
    }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification}/>
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