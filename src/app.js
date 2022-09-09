import express from "express"

const app = express()

const host = "localhost"
const port = 8017

app.get("/", (req, res) => {
  res.end("<h1>Hello word - hi hi hoho</h1><hr />")
})

app.listen(port, host, () => {
  // eslint-disable-next-line no-console
  console.log(`hello trello clone! I'm running on ${host}:${port}`)
})
