import React, { useState } from "react";
import axios from 'axios'

function App() {

  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=5b6bcfc0e6b506487310b8d3e0923298`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation([])
    }

  }

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Enter coordinates'
          type='text' />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            {data.sys ? <p>{data.sys.country}</p> : null}
          </div>
          <div className="temperature">
            {data.main ? <h1>{Math.floor(data.main.temp - 273)} C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>
        <div className="bottom">
          <div className="feels">
            {data.main ? <p className="bold">{Math.floor(data.main.feels_like -273)} C</p> : null}
            <p>Feels like</p>
          </div>
          <div className="humidity">
            {data.main ? <p className="bold">{data.main.humidity}%</p> : null }
            <p>Humidity</p>
          </div>
          <div className="wind">
            {data.wind ? <p className="bold">{data.wind.speed} Km/h</p> : null}
            <p>Winds</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
