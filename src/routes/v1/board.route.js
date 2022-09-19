import express from "express"
import { BoardController } from "../../controllers/board.controller"
import { BoardValidation } from "../../validations/board.validation"

const router = express.Router()

router.route("/").post(BoardValidation.createNew, BoardController.createNew)

router.route("/:id").put(BoardValidation.update, BoardController.update)

export const BoardRoutes = router
