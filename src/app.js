import express from "express"
import { ENV } from "./config/constant"
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

  app.use("/v1/", apiV1)
  app.use(express.json())

  app.listen(ENV.APP_PORT, ENV.APP_HOST, () => {
    // eslint-disable-next-line no-console
    console.log(
      `hello trello clone! I'm running on ${ENV.APP_HOST}:${ENV.APP_PORT}`
    )
  })
}
