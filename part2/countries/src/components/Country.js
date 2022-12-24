const Country = ({country}) => {
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
        </div>
    )
}

export default Country