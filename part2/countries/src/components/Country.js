import axios from 'axios'
const Country = ({country, temp, setTemp, windSpeed, setWindSpeed}) => {

  axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${country.latlng[0]}&longitude=${country.latlng[1]}&current_weather=true`)
  .then(response => {
    setTemp(response.data.current_weather.temperature)
    setWindSpeed(response.data.current_weather.windspeed)
  })

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
          <p>temperature {temp} celcius</p>
          <p>wind speed {windSpeed}</p>
        </div>
    )
}

export default Country