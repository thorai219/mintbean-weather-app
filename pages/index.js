import Header from "next/head"
import axios from "axios"

export const getServerSideProps = async () => {
  const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY
  const city = "Toronto"
  const req = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  const { data } = await axios.get(req)
  const { main, weather } = data

  return {
    props: {
      temperature: main.temp,
      weather: weather[0].main,
      city
    }
  }
}

function HomePage({ temperature, weather, city }) {
  return (
    <div>
      <h1>{city}</h1>
      <h3>Temp : {temperature}</h3>
      <h3>Weather : {weather}</h3>
    </div>
  )
}

export default HomePage
