/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {

  const [persons, setPersons] = useState([])

  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(false)

  // eslint-disable-next-line react/prop-types
  const Notification = ({message, error}) => {
    if(message === null) {
      return null;
    }
    return (
      <div className={error ? 'error' : 'message'}>
        {message}
      </div>
    )
  }

  useEffect(() => {
    personService
      .getAll()
      .then(initialResult => {
        setPersons(initialResult)
      })
  }, [])


  const addName = (event) => {
    event.preventDefault();
    const person = {
      name: newName,
      number: newNumber
    }

    if(!persons.some(p => p.name === newName)) {

      personService.create_person(person).then(returnedPerson =>
        setPersons(persons.concat(returnedPerson))
        )
      setNewName("")
      setNewNumber("")
      setMessage("Added " + person.name)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
    else {
      window.confirm(newName + ' is already added to phonebook, replace the old number with a new one?')
      const person = persons.find(p => p.name === newName)
      const changedPerson = { ...person, number: newNumber }

      personService
      .edit_person(person.id, changedPerson)
      .then(returnedPerson => {
        setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
        setNewName("")
        setNewNumber("")
        setMessage(person.name + "'s is changed")
      }).catch(error => {
        setError(true)
        setMessage("Information of " + person.name + " has already been removed from server")
      })

      setTimeout(() => {
        setMessage(null)
      }, 5000)
      setError(false)
    }
  }

  const deleteName = (id) => {
    const person = persons.find(p => p.id === id)
    window.confirm('Delete ' + person.name + '?')

    personService.delete_person(id).then(setPersons(persons.filter(p => p.id !== id)))
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
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
      <Notification message={message} error={error}/>
      <Filter handleNameFilter={handleNameFilter}/>
      <h3>Add a new</h3>
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} deleteName={deleteName}/>
    </div>
  )
}

export default App