import React from "react"
import Weather from "./Weather"

const Country = ({country, languages}) => {
    return (
      <div>
        <h1>{country.name}</h1>
        <div>
          capital {country.capital} 
          <br></br>
          population {country.population}
        </div>
        <div>
          <h2>languages</h2>
          <ul>
            {languages.map(v => <li key={v.iso639_2}>{v.name}</li>)}
          </ul>
          <img className="image" src= {country.flag} alt = "flag"/>
        </div>
        <div>
          <h2>weather in {country.capital}</h2>
          <Weather capital={country.capital} />
        </div>
      </div>
    )
  }

export default Country;