import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import dataRoute from "./routes/weather"

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors({ origin: "http://localhost:3000" }))

app.get("/", (req, res) => res.send("weather api"))
app.use("/api", dataRoute)

app.listen(process.env.PORT, () => {
  console.log(`Server at port ${process.env.PORT}`)
})
