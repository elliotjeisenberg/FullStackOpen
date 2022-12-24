import Country from './Country'
import CountryOption from './CountryOption'

const CountryList = ({countries, setCurrCountries, temp, setTemp, windSpeed, setWindSpeed}) => {
  
    if (countries.length > 10) {
      return (
        <p>Too many matches, specify another filter</p>
      )
    } else if (countries.length === 1) {
      return <Country country={countries[0]} temp={temp} setTemp={setTemp} windSpeed={windSpeed} setWindSpeed={setWindSpeed}/>
    } else {
      return (
        <div>
            <ul>
            {countries.map(country => {
                return <CountryOption setCurrCountries={setCurrCountries} key={country.ccn3} country={country} />
            })}
            </ul>
        </div>
      )
    }
  }

  export default CountryList