import { MongoClient, ServerApiVersion } from "mongodb"
import { ENV } from "./constant.js"

let connection = null

export const connect = async () => {
  const client = new MongoClient(ENV.MONGO_CLIENT_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    serverApi: ServerApiVersion.v1,
  })

  await client.connect()

  connection = client.db(ENV.DATABASE_NAME)
}

export const getInstanceConnection = () => {
  if (!connection) throw new Error("We have to connect to Database first.")
  return connection
}
