import Joi from "joi"
import { getInstanceConnection } from "../config/mongodb"

const columnCollectionName = "column"

const columnCollectionSchema = Joi.object({
  boardId: Joi.string().required(),
  title: Joi.string().required().min(3).max(20),
  cardOrder: Joi.array().items(Joi.string()).default([]),
  createdAt: Joi.timestamp().default(Date.now()),
  updatedAt: Joi.timestamp().default(null),
  _destroy: Joi.boolean().default(false),
})

const validateSchema = async (data) =>
  await columnCollectionSchema.validateAsync(data, { abortEarly: false })

const createNew = async (data) => {
  try {
    const validValues = await validateSchema(data)

    const result = getInstanceConnection()
      .collection(columnCollectionName)
      .insertOne(validValues)

    return result.ops[0]
  } catch (error) {
    console.log(error)
  }
}

export const columnModel = { createNew }
