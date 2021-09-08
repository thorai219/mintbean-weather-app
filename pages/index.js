import axios from "axios"

export const getServerSideProps = async () => {
  const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY
  const city = "Toronto"
  const req = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  const res = await axios.get(req)
  const resTemp = res.data.main["temp"]
  const resMain = res.data.weather[0].main

  return {
    props: {
      resTemp,
      resMain,
      city
    }
  }
}

function HomePage({ resTemp, resMain, city }) {
  return (
    <div>
      <h1>Home Page</h1>
      <h5>{city}</h5>
      <h5>Temp : {resTemp}</h5>
      <h5>Weather : {resMain}</h5>
    </div>
  )
}

export default HomePage
