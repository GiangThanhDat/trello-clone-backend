import * as dotenv from "dotenv" // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

export const ENV = {
  DATABASE_NAME: process.env.DATABASE_NAME,
  MONGO_CLIENT_URL: process.env.MONGO_CLIENT_URL,
  APP_HOST: process.env.APP_HOST,
  APP_PORT: process.env.APP_PORT,
}
