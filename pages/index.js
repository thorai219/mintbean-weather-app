import axios from "axios";
import { useEffect, useState } from "react";

function HomePage() {
  
  const [weatherData, setWeatherData] = useState({
    temp: 0,
    main: "",
  })

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const city = "Toronto";
  const req = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const getWeather = async () => {
    try {
      const res = await axios.get(req);
      const resTemp = res.data.main["temp"];
      const resMain = res.data.weather[0].main;
      setWeatherData({
        temp : resTemp,
        main: resMain,
      })
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <div>
      <h1>Home Page</h1>
      <h5>{city}</h5>
      <h5>Temp : {weatherData.temp}</h5>
      <h5>Weather : {weatherData.main}</h5>
    </div>
  );
}

export default HomePage;
