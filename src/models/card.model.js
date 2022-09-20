import Joi from "joi"
import { ObjectId } from "mongodb"
import { CARD } from "../config/constant"
import { getInstanceConnection } from "../config/mongodb"

const cardCollectionName = "card"

const cardCollectionSchema = Joi.object({
  boardId: Joi.string().required(),
  columnId: Joi.string().required(),
  title: Joi.string()
    .required()
    .min(CARD.TITLE_MIN_LENGTH)
    .max(CARD.TITLE_MAX_LENGTH)
    .trim(),
  cover: Joi.string().default(null),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false),
})

const validateSchema = async (data) =>
  await cardCollectionSchema.validateAsync(data, { abortEarly: false })

const createNew = async (data) => {
  try {
    const validValues = await validateSchema(data)

    const cardCollection =
      getInstanceConnection().collection(cardCollectionName)

    const insertedValues = {
      ...validValues,
      boardId: ObjectId(validValues.boardId),
      columnId: ObjectId(validValues.columnId),
    }

    const { insertedId } = await cardCollection.insertOne(insertedValues)

    const insertedCard = await cardCollection.findOne({
      _id: insertedId,
    })

    if (!insertedCard) {
      throw new Error("Insert new card failure")
    }

    return insertedCard
  } catch (error) {
    console.log(error)
  }
}

const update = async (id, data) => {
  try {
    const cardCollection =
      getInstanceConnection().collection(cardCollectionName)

    const result = await cardCollection.findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: data },
      { returnOriginal: false }
    )

    return result.value
  } catch (error) {
    throw new Error(error)
  }
}

export const CardModel = { cardCollectionName, createNew, update }
