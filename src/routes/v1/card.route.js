import express from "express"
import { CardController } from "../../controllers/card.controller"
import { CardValidation } from "../../validations/card.validation"

const router = express.Router()

router.route("/").post(CardValidation.createNew, CardController.createNew)

export const CardRoutes = router
