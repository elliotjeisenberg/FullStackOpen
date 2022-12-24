import axios from 'axios'
import {useEffect, useState} from 'react'

const CountryList = ({countries}) => {
  
  if (countries.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  } else if (countries.length === 1) {
    const c = countries[0]
    return (
      <div>
        <h2>{c.name.common}</h2>
        <p>Capital {c.capital}</p>
        <p>Area {c.area}</p>
        <h3>Languages</h3>
        <ul>
          {Object.entries(c.languages).map(lang => {
            return <li key={lang[0]}>{lang[1]}</li>
          })}
        </ul>
      </div>
    )
  } else {
    return (
      countries.map(country => {
        return <li key={country.ccn3}>{country.name.common}</li>
      })
    )
  }
}

function App() {

  const [countrySearch, setCountrySearch] = useState('')
  const [countries, setCountries] = useState([])
  const [currCountries, setCurrCountires] = useState([])

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
    .then(response => {
      setCountries(response.data)
    })
  },[])

  const handleSearchChange = (event) => {
    setCountrySearch(event.target.value)
    setCurrCountires(countries.filter(country => {
      return (country.name.common.includes(event.target.value))
    }))
  }

  return (
    <div>
        find countries <input onChange={handleSearchChange} value={countrySearch}/>
        <CountryList countries={currCountries}/>
    </div>
  );
}

export default App;
