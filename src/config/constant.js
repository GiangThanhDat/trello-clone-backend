import * as dotenv from "dotenv" // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

export const ENV = {
  MONGO_CLIENT_URL: process.env.MONGO_CLIENT_URL,
  HOST: process.env.HOST,
  PORT: process.env.PORT,
}
