import { Response, Request } from "express"
import { WeatherApi } from "../api/weatherApi"

export const forecastData = async (req: Request, res: Response) => {
  const { lat, lon } = req.query
  try {
    const { daily } = await WeatherApi.oneCall(lat, lon)
    const updatedData = updateDateTime(daily)

    res.json(updatedData)
  } catch (err) {
    console.log(err)
  }
}

// datetime is return in unix timestamp
// convert it to utc time
const updateDateTime = (data: any) =>
  data.map((item: any) => {
    let temp = Object.assign({}, item)
    const today = new Date().getTime()
    if (temp.dt < today) {
      temp.dt = temp.dt * 1000
    }
    return temp
  })
