import express from "express"
import { CardController } from "../../controllers/card.controller"
import { CardValidation } from "../../validations/card.validation"

const router = express.Router()

router
  .route("/")
  //   .get((req, res) => {
  //     console.log("GET Card")
  //   })
  .post(CardValidation.createNew, CardController.createNew)

export const CardRoutes = router
