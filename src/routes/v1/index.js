import express from "express"
import { HttpStatusCode } from "../../utilities/constant"
import { BoardRoutes } from "./board.route"
import { CardRoutes } from "./card.route"
import { ColumnRoutes } from "./column.route"

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
router.use("/board", BoardRoutes)

/**
 * COLUMN API
 */
router.use("/column", ColumnRoutes)
/**
 * CARD API
 */
router.use("/card", CardRoutes)

export const apiV1 = router
