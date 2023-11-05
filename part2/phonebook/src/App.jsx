import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {

  const [persons, setPersons] = useState([])

  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])


  const addName = (event) => {
    event.preventDefault();
    const person = {
      name: newName,
      number: newNumber
    }

    if(!persons.some(p => p.name === newName)) {
      setPersons(persons.concat(person))
      setNewName("")
      setNewNumber("")
    }
    else {
      alert(newName + ' is already added to phonebook')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
    console.log(newName)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNameFilter = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleNameFilter={handleNameFilter}/>
      <h3>Add a new</h3>
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter}/>
    </div>
  )
}

export default App