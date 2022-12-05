import cors from "cors"
import express from "express"
import { ENV } from "./config/constant"
import { corsOptions } from "./config/cors"
import { connect } from "./config/mongodb"
import { apiV1 } from "./routes/v1"

connect()
  .then(() => console.log("MongoDB Connected successfully"))
  .then(() => bootServer())
  .catch((err) => {
    console.log(err)
    process.exit()
  })

const bootServer = () => {
  const app = express()

  app.use(cors(corsOptions))

  app.use(express.json())

  app.use("/v1", apiV1)
  app.listen(ENV.APP_PORT, ENV.APP_HOST, () => {
    // eslint-disable-next-line no-console
    console.log(`Trello-App clone running on ${ENV.APP_HOST}:${ENV.APP_PORT}`)
  })
  // app.listen(ENV.PORT, () => {
  //   // eslint-disable-next-line no-console
  //   console.log(`Trello-App clone running on ${ENV.PORT}`)
  // })
}
