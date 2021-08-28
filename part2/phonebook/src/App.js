import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import Notification from './components/Notification'
import PersonsForm from './components/PersonsForm'
import Persons from './components/Persons'
import './App.css'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ newFilter, setNewFilter] = useState('')
  const [ popup, setPopup ] = useState(null)
  const handleNameChange = event => setNewName(event.target.value)
  const handleNumberChange = event => setNewNumber(event.target.value)
  const handleFilterChange = event => setNewFilter(event.target.value)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = event => {
    event.preventDefault()
    if (newName === '' || newNumber === '') {
      alert("Name or number cannot be blank")
    }
    else { //In this case, a name is also unique since duplicate addition is prevented and replaced with updating number
      const person = persons.find(v => v.name.toLowerCase() === newName.toLowerCase())
      if (person) {
        if (window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)) {
          //console.log(person)
          const changedNumber = {...person, number: newNumber}
  
          personService
          .update(person.id, changedNumber)
          .then(returnedPerson => {
            setPersons(persons.map(element => element.id !== person.id ? element : returnedPerson))
            setPopup({
              message: `Updated ${person.name}`,
              status: 'success'
            })
            setTimeout(() => {setPopup(null)}, 3000)
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            setPopup({
              message: `Information of ${person.name} has already been removed from the server `,
              status: 'error'
            })
            setTimeout(() => {setPopup(null)}, 3000)
            setPersons(persons.filter(item => item.id !== person.id))
            setNewName('')
            setNewNumber('')
          })
        }
      }
      else {
        const personObject = {
          name: newName,
          number: newNumber
        }
  
        personService
          .create(personObject)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            setPopup({
              message: `Added ${returnedPerson.name}`,
              status: 'success'
            })
            setTimeout(() => {setPopup(null)}, 1000000)
            setNewName('')
            setNewNumber('')
          })
      }
    }
  }

  const deletePerson = id => {
    const person = persons.find(n => n.id === id)

    if (window.confirm(`delete ${person.name} ?`)) {
      personService
      .erase(id)
      .then(() => {
        setPersons(persons.filter(item => item.id !== person.id))
      })
    }
  }

  const personsFiltered = (newFilter === '')
  ? persons
  : persons.filter(
    v => v.name.toLowerCase().includes((newFilter).toLowerCase()) //toLowerCase() is used to handle
    )  // insensitive case problems by lowercasing both the 'name' property and the user's input

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification popup = {popup}/>
      <Filter text = {'filter shown with'} value={newFilter} onChange={handleFilterChange}/>

      <h2>add a new</h2>
      <PersonsForm
      onSubmit = {addPerson}
      valueName = {newName} onChangeName = {handleNameChange}
      valueNumber = {newNumber} onChangeNumber={handleNumberChange}/>

      <h2>Numbers</h2>
      <Persons array = {personsFiltered} onClick={deletePerson}/>
    </div>
  )
}

export default App