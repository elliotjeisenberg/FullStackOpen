import axios from 'axios'
import {useEffect, useState} from 'react'
import CountryList from './components/CountryList'

function App() {

  const [countrySearch, setCountrySearch] = useState('')
  const [countries, setCountries] = useState([])
  const [currCountries, setCurrCountries] = useState([])
  const [temp, setTemp] = useState()
  const [windSpeed, setWindSpeed] = useState()

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
    .then(response => {
      setCountries(response.data)
    })
  },[])

  const handleSearchChange = (event) => {
    setCountrySearch(event.target.value)
    setCurrCountries(countries.filter(country => {
      return (country.name.common.toUpperCase().includes(event.target.value.toUpperCase()))
    }))
  }

  return (
    <div>
        find countries <input onChange={handleSearchChange} value={countrySearch}/>
        <CountryList setCurrCountries={setCurrCountries} countries={currCountries} temp={temp} setTemp={setTemp} windSpeed={windSpeed} setWindSpeed={setWindSpeed}/>
    </div>
  );
}

export default App;
