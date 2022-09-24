import * as dotenv from "dotenv" // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

// board schema constants
export const BOARD = {
  TITLE_MIN_LENGTH: 3,
  TITLE_MAX_LENGTH: 20,
}

// card schema constants
export const CARD = {
  TITLE_MIN_LENGTH: 3,
  TITLE_MAX_LENGTH: 40,
}

// column schema constants
export const COLUMN = {
  TITLE_MIN_LENGTH: 3,
  TITLE_MAX_LENGTH: 20,
}

// white list to allow cors
export const WHITE_LIST = ["http://localhost:3000", "http://localhost:3001"]

//  Environment constants
export const ENV = {
  DATABASE_NAME: process.env.DATABASE_NAME,
  MONGO_CLIENT_URL: process.env.MONGO_CLIENT_URL,
  APP_HOST: process.env.APP_HOST,
  APP_PORT: process.env.APP_PORT,
}
