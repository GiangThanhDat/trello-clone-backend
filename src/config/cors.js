import { WHITE_LIST } from "./constant"

export const corsOptions = {
  origin: (origin, callback) => {
    if (WHITE_LIST.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
}
