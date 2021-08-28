import React, { useState, useEffect } from 'react' //TODO: 2.13 2.14
import './App.css'
import axios from 'axios'
import Countries from "./components/Countries";
import Find from "./components/Find";

function App() {
  const [ countries, setCountries ] = useState([])
  const [ newFilter, setNewFilter ] = useState('')
  const handleFilterChange = event => setNewFilter(event.target.value)

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => { setCountries(response.data)
      })
  }, [])

  const countriesFiltered = (newFilter === '') 
  ? [] 
  : countries.filter(
    v => v.name.toLowerCase().includes((newFilter).toLowerCase()) //toLowerCase() is used to handle
    )  // insensitive case problems by lowercasing both the 'name' property and the user's input

  return (
    <div className="App">
      <Find text = {'find countries'} value={newFilter} onChange={handleFilterChange}/>
      <Countries array = {countriesFiltered} />
    </div>
  )
}

export default App;
