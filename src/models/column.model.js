import Joi from "joi"
import { COLUMN } from "../config/constant"
import { getInstanceConnection } from "../config/mongodb"

const columnCollectionName = "column"

const columnCollectionSchema = Joi.object({
  boardId: Joi.string().required(),
  title: Joi.string()
    .required()
    .min(COLUMN.TITLE_MIN_LENGTH)
    .max(COLUMN.TITLE_MAX_LENGTH)
    .trim(),
  cardOrder: Joi.array().items(Joi.string()).default([]),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false),
})

const validateSchema = async (data) =>
  await columnCollectionSchema.validateAsync(data, { abortEarly: false })

const createNew = async (data) => {
  try {
    const validValues = await validateSchema(data)

    const columnCollection =
      getInstanceConnection().collection(columnCollectionName)

    const { insertedId } = await columnCollection.insertOne(validValues)

    const insertedColumn = await columnCollection.findOne({
      _id: insertedId,
    })

    if (!insertedColumn) {
      throw new Error("Insert new column failure")
    }

    return insertedColumn
  } catch (error) {
    console.log(error)
  }
}

export const ColumnModel = { createNew }
