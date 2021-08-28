import React from "react"
import Country from "./Country"

const Countries = ({array}) => {

    if (array.length > 1 && array.length <= 10) {
      return (
        <div>
          {array.map(
          (country,index) => 
          <div key={index}> {country.name} </div>
          )}
        </div>
      )
    }
  
    else if (array.length === 1) {
      const country = array[0]
      const languages = country.languages
  
      return (
        <Country country={country} languages={languages} />
      )
    }
  
    else if (array.length > 10) return <div>Too many matches, specify another filter</div> 
    else return <div></div>
  }

export default Countries;