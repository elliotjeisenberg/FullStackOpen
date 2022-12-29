import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons'

const getPhonebook = () => {
    const result = axios.get(baseUrl)
    return result.then(res => res.data)
}

const addPerson = newPerson => {
    const result = axios.post(baseUrl, newPerson)
    return result.then(res => res.data)
}

const deletePerson = id => {
    const result = axios.delete(`${baseUrl}/${id}`)
    return result.then(res => res.data)
}

const updatePerson = (id, newObject) => {
    const result = axios.put(`${baseUrl}/${id}`, newObject)
    return result.then(res => res.data)
}

export default {getPhonebook, addPerson, deletePerson, updatePerson}