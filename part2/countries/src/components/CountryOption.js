const CountryOption = ({country, setCurrCountries}) => {
    return (
    <li>
        {country.name.common} 
        <button onClick={() => {setCurrCountries([country])}}>show</button>
    </li>
    )
}
export default CountryOption