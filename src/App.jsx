import { useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {

  const [city, setCity] = useState('')
  const [weather, setWeather] = useState("")
  const [desc, setDesc] = useState("")
  const [temp, setTemp] = useState("")
  const [speed, setSpeed] = useState("")
  const [humidity, setHumidity] = useState("")
  const [error, setError] = useState(null)

  function handleCity(evt) {
    setCity(evt.target.value)
    setError(null)
  }


  function getWeather() {

    if (!city) {
      setError("Please enter a city name")
      return
    }

    var weatherData = axios(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0edbb466ebe653c767680f27b7aebe41&units=imperial`)

    weatherData.then(function (succes) {
      setWeather(succes.data.weather[0].main)
      setDesc(succes.data.weather[0].description)
      setTemp(succes.data.main.temp)
      setHumidity(succes.data.main.humidity)
      setSpeed(succes.data.wind.speed)
      setCity('')
      setError(null)
    }).catch(error => {
      console.log(error)
      setError("Error fetching weather data. Please check the city name")
    })
  }

  return (
    <div className='bg-[url(/bg.jpg)] bg-cover text-white font-sans lg:p-17 sm:p-2'>
      <div className='p-10 rounded-md text-center'>
        <h1 className='text-4xl font-medium'>Weather Report</h1>
        <p className='sm:text-xl lg:text-2xl p-3 text-amber-200'>I can give you a weather report about your city🌦️</p>
        <div className='p-5 flex gap-4 justify-center items-center flex-wrap'>
          <input onChange={handleCity} value={city} className='rounded-3xl border-2 border-white px-10 outline-0 py-2 bg-transparent text-lg' type='text' placeholder='🔍Search your city'></input>
          <button className='bg-white text-black py-3 px-4 rounded-3xl text-lg sm:text-sm' onClick={getWeather}>Get Report</button>
        </div>
        <h1 className='text-7xl p-2'>🌦️</h1>
        <h1 className='text-4xl p-2 font-bold'>{weather}</h1>
        <h1 className='text-3xl p-2 font-medium text-amber-300'>{desc.toUpperCase()}</h1>
        <div className='flex flex-wrap gap-10 justify-center items-center p-6'>
          <p className='text-2xl p-3 rounded-lg bg-[#30275E]'>Speed🌪️ ~ {speed}</p>
          <p className='text-2xl p-3 rounded-lg bg-[#30275E]'>Temperature🌡️ ~ {temp} </p>
          <p className='text-2xl p-3 rounded-lg bg-[#30275E]'>Humidity💧 ~ {humidity} </p>
        </div>
        {error && <p className='text-red-700 text-2xl'>{error}</p>}
      </div>
    </div>
  )
}

export default App
