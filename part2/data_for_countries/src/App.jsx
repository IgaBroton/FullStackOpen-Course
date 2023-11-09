import { useState, useEffect } from 'react'
import countryService from './services/country'
import Search from './components/Search';


const App = () => {

  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    countryService
      .getAll()
      .then(countries => {
        setCountries(countries)
      })
  }, [])

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const handleShow = (event) => {
    setSearch(event.target.value)
  }

  return (
    <div>
      <Search handleSearch={handleSearch}/>
      
      {
      (countries.filter(country => country.name.common.toUpperCase().includes(search.toUpperCase()))).length === 1 ?

      countries.filter(country => country.name.common.toUpperCase().includes(search.toUpperCase()))
      .map(country => 
        <div key={country.name.common}> 
          <h1>{country.name.common}</h1>
          <div>capital: {country.capital.map(cap => <span key={cap}>{cap} </span>)}</div>
          <div>area: {country.area}</div>
          <br />
          <b>languages:</b>
          <ul>
            {Object.entries(country.languages).map(language => <li key={language[0]}>{language[1]}</li>)}
          </ul>
          <img src={country.flags.png} height="15%" width="15%" />
        </div>)
      :
      (
        (countries.filter(country => country.name.common.toUpperCase().includes(search.toUpperCase()))).length > 10 && search != '' ? 
          'Too many matches, specify another filter' 
        : 
        countries.filter(country => country.name.common.toUpperCase().includes(search.toUpperCase()))
        .map(country => <div key={country.name.common}> {country.name.common} <button onClick={handleShow}>show</button></div>)
      )
    }
    </div>
  )
}

export default App
