import Joi from "joi"
import { BOARD } from "../config/constant"
import { HttpStatusCode } from "../utilities/constant"

const createNew = async (req, res, next) => {
  const condition = Joi.object({
    title: Joi.string()
      .required()
      .min(BOARD.TITLE_MIN_LENGTH)
      .max(BOARD.TITLE_MAX_LENGTH)
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

const update = async (req, res, next) => {
  const condition = Joi.object({
    title: Joi.string()
      .min(BOARD.TITLE_MIN_LENGTH)
      .max(BOARD.TITLE_MAX_LENGTH)
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

export const BoardValidation = { createNew, update }
