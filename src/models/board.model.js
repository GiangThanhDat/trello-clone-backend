import Joi from "joi"
import { getInstanceConnection } from "../config/mongodb"

const boardCollectionName = "board"

const boardCollectionSchema = Joi.object({
  title: Joi.string().required().min(3).max(20),
  columnOrder: Joi.array().items(Joi.string()).default([]),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false),
})

const validateSchema = async (data) =>
  await boardCollectionSchema.validateAsync(data, { abortEarly: false })

const createNew = async (data) => {
  try {
    const validValues = await validateSchema(data)

    const result = getInstanceConnection()
      .collection(boardCollectionName)
      .insertOne(validValues)

    return result.ops[0]
  } catch (error) {
    throw new Error(error)
  }
}

export const BoardModel = { createNew }
