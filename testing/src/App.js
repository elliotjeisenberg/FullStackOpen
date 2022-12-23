import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

    
  const hook = () => {
    console.log('effect')

    const eventHandler = (response) => {
      console.log('promise fulfilled')
      setNotes(response.data)
    }

    const promise = axios.get('http://localhost:3001/notes')
    promise.then(eventHandler)

  }

  useEffect(hook, [])
  
  console.log('render', notes.length, 'notes')

  // ...
}

export default App