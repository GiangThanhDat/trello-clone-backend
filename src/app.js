import express from "express"
import { ENV } from "./config/constant.js"
import { connect } from "./config/mongodb.js"

const app = express()

connect()
  .then(() => console.log("MongoDB Connected successfully"))
  .then(() => bootServer())
  .catch((err) => {
    console.log(err)
    process.exit()
  })

const bootServer = () => {
  app.get("/", (req, res) => {
    res.end("<h1>Hello word - hi hi hoho</h1><hr />")
  })

  app.listen(ENV.APP_PORT, ENV.APP_HOST, () => {
    // eslint-disable-next-line no-console
    console.log(
      `hello trello clone! I'm running on ${ENV.APP_HOST}:${ENV.APP_PORT}`
    )
  })
}
