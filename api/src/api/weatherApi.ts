import axios from "axios"
import fs from "fs"
import path from "path"

const URL = `http://api.openweathermap.org/data/2.5`

export const WeatherApi = {
  oneCall: (lat: any, lon: any) => {
    const api = cacheService(lat, lon)
    return api()
  }
}

const cacheService = (lat: string, lon: string) => async () => {
  const filename = `${lat}.${lon}.json`
  const filepath = path.join(__dirname, "..", "cache", filename)

  const fileExists = fs.existsSync(filepath)
  let data: any

  if (fileExists) {
    try {
      const fileContents: any = fs.readFileSync(filepath)
      data = JSON.parse(fileContents)
    } catch (e) {
      data = null
    }
  }

  if (!data) {
    const response = await axios.get(
      `${URL}/onecall?lat=${lat}&lon=${lon}&appId=${process.env.WEATHER_API_KEY}&unit=imperial`
    )
    data = response.data

    try {
      fs.writeFileSync(filepath, JSON.stringify(response.data, null, 2))
    } catch (e) {
      throw e
    }
  }

  return data
}
