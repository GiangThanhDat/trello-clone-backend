import { MongoClient, ServerApiVersion } from "mongodb"

const url =
  "mongodb+srv://gthanhdatpro:1TxSQ9VOVdzBnWvP@cluster0.xtbtkiv.mongodb.net/?retryWrites=true&w=majority"

export const connect = async () => {
  const client = new MongoClient(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    serverApi: ServerApiVersion.v1,
  })
  try {
    await client.connect()
    console.log("connect to mongoDb successfully")

    await listDatabase(client)
  } finally {
    await client.close()
  }
}

const listDatabase = async (client) => {
  const listDatabases = await client.db().admin().listDatabases()
  listDatabases.databases.forEach((database) => console.log(database.name))
}
