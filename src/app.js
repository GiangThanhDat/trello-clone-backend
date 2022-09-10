import express from "express"
import { ENV } from "./config/constant.js"
import { connect } from "./config/mongodb.js"

const app = express()

connect().catch(console.log)

app.get("/", (req, res) => {
  res.end("<h1>Hello word - hi hi hoho</h1><hr />")
})

app.listen(ENV.PORT, ENV.HOST, () => {
  // eslint-disable-next-line no-console
  console.log(`hello trello clone! I'm running on ${ENV.HOST}:${ENV.PORT}`)
})
