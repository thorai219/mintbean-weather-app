import express from "express"
import { forecastData } from "../controllers/weather"

const router = express.Router()

router.get("/forecast-data", forecastData)

export default router
