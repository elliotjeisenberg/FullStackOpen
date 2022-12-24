import axios from 'axios'
import {useEffect, useState} from 'react'
const Country = ({country}) => {

  const [weather, setWeather] = useState('')

  // axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${country.latlng[0]}&longitude=${country.latlng[1]}&current_weather=true`)
  // .then(response => {
  //   setTemp(response.data.current_weather.temperature)
  //   setWindSpeed(response.data.current_weather.windspeed)
  // })

  useEffect(() => {
    axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${country.latlng[0]}&longitude=${country.latlng[1]}&current_weather=true`)
  .then(response => {
    setWeather(response.data.current_weather)
    })
  },[])




    return (
        <div>
          <h2>{country.name.common}</h2>
          <p>Capital {country.capital}</p>
          <p>Area {country.area}</p>
          <h3>Languages</h3>
          <ul>
            {Object.entries(country.languages).map(lang => {
              return <li key={lang[0]}>{lang[1]}</li>
            })}
          </ul>
          <img src={country.flags.png} />
          <p>temperature {weather.temperature} celcius</p>
          <p>wind speed {weather.windspeed}</p>
        </div>
    )
}

export default Country