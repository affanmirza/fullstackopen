import React, { useState, useEffect } from "react"
import axios from 'axios'

const Weather = ({ capital }) => {
    const api_key = process.env.REACT_APP_API_KEY
    const [ capitalWeather, setCapitalWeather] = useState({
      temp: 0,
      icon: 'c01d',
      wind_spd: 0,
      wind_cdir_full: '(loading...)'
    })
  
    useEffect(() => {
      axios
        .get(`https://api.weatherbit.io/v2.0/current?city=${capital}&key=${api_key}`)
        .then(response => 
        {
          const details = response.data.data[0]
          setCapitalWeather({
          temp: details.temp,
          icon: details.weather.icon,
          wind_spd: details.wind_spd,
          wind_cdir_full: details.wind_cdir_full
          })
        })
        }, [api_key, capital])
  
      return (
        <div>
          <b>temperature: </b>{capitalWeather.temp} Celsius
          <div>
            <img className="image" src={`https://www.weatherbit.io/static/img/icons/${capitalWeather.icon}.png`} alt = "icon"/>
          </div>
          <div>
            <b>wind: </b> {capitalWeather.wind_spd} m/s direction {capitalWeather.wind_cdir_full}
          </div>
        </div>
      )
  }

export default Weather;