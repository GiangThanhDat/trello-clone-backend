import express from "express"
import { HttpStatusCode } from "../../utilities/constant"
import { boardRoutes } from "./board.route"

const router = express.Router()

/**
 * GET v1/status
 */
router.get("/status", (req, res) =>
  res.status(HttpStatusCode.OK).json({ status: "OK" })
)

/**
 * BOARD API
 */
router.use("/board", boardRoutes)

export const apiV1 = router
