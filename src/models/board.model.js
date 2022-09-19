import Joi from "joi"
import { ObjectId } from "mongodb"
import { BOARD } from "../config/constant"
import { getInstanceConnection } from "../config/mongodb"

const boardCollectionName = "board"

const boardCollectionSchema = Joi.object({
  title: Joi.string()
    .required()
    .min(BOARD.TITLE_MIN_LENGTH)
    .max(BOARD.TITLE_MAX_LENGTH)
    .trim(),
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

    const boardCollection =
      getInstanceConnection().collection(boardCollectionName)

    const { insertedId } = await boardCollection.insertOne(validValues)

    const insertedBoard = await boardCollection.findOne({
      _id: insertedId,
    })

    if (!insertedBoard) {
      throw new Error("Insert new board failure")
    }

    return insertedBoard
  } catch (error) {
    throw new Error(error)
  }
}

const update = async (id, data) => {
  try {
    const boardCollection =
      getInstanceConnection().collection(boardCollectionName)

    const result = await boardCollection.findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: data },
      { returnOriginal: false }
    )

    return result.value
  } catch (error) {
    throw new Error(error)
  }
}

const pushColumnOrder = async (boardId, columnId) => {
  try {
    const boardCollection =
      getInstanceConnection().collection(boardCollectionName)

    const result = await boardCollection.findOneAndUpdate(
      { _id: ObjectId(boardId) },
      { $push: { columnOrder: columnId } },
      { returnOriginal: false }
    )

    return result.value
  } catch (error) {
    throw new Error(error)
  }
}

export const BoardModel = { createNew, update, pushColumnOrder }
