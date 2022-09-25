import Joi from "joi"
import { COLUMN } from "../config/constant"
import { HttpStatusCode } from "../utilities/constant"

const createNew = async (req, res, next) => {
  const condition = Joi.object({
    boardId: Joi.string().required(),
    title: Joi.string()
      .required()
      .min(COLUMN.TITLE_MIN_LENGTH)
      .max(COLUMN.TITLE_MAX_LENGTH)
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
    boardId: Joi.string(),
    title: Joi.string()
      .min(COLUMN.TITLE_MIN_LENGTH)
      .max(COLUMN.TITLE_MAX_LENGTH)
      .trim(),
  })

  try {
    await condition.validateAsync(req.body, {
      abortEarly: false,
      allowUnknown: true,
    })
    next()
  } catch (error) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      errors: new Error(error).message,
    })
  }
}

export const ColumnValidation = { createNew, update }
