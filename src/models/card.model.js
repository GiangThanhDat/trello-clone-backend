import Joi from "joi"
import { getInstanceConnection } from "../config/mongodb"

const cardCollectionName = "card"

const cardCollectionSchema = Joi.object({
  boardId: Joi.string().required(),
  columnId: Joi.string().required(),
  title: Joi.string().required().min(3).max(20),
  cover: Joi.string().default(null),
  createdAt: Joi.timestamp().default(Date.now()),
  updatedAt: Joi.timestamp().default(null),
  _destroy: Joi.boolean().default(false),
})

const validateSchema = async (data) =>
  await cardCollectionSchema.validateAsync(data, { abortEarly: false })

const createNew = async (data) => {
  try {
    const validValues = await validateSchema(data)
    const result = getInstanceConnection()
      .collection(cardCollectionName)
      .insertOne(validValues)

    return result.ops[0]
  } catch (error) {
    console.log(error)
  }
}

export const cardModel = { createNew }
