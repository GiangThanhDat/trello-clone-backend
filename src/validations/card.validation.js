import Joi from "joi"
import { CARD } from "../config/constant"
import { HttpStatusCode } from "../utilities/constant"

const createNew = async (req, res, next) => {
  const condition = Joi.object({
    boardId: Joi.string().required(),
    columnId: Joi.string().required(),
    title: Joi.string()
      .required()
      .min(CARD.TITLE_MIN_LENGTH)
      .max(CARD.TITLE_MAX_LENGTH)
      .trim(),
  })

  try {
    await condition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      errors: new Error(error).message,
    })
  }
}

export const CardValidation = { createNew }
