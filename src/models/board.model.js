import Joi from "joi"
import { ObjectId } from "mongodb"
import { BOARD } from "../config/constant"
import { getInstanceConnection } from "../config/mongodb"
import { CardModel } from "./card.model"
import { ColumnModel } from "./column.model"

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

    const updateData = { ...data, _id: ObjectId(id) }

    const result = await boardCollection.findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: updateData },
      { returnDocument: "after" }
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
      { returnDocument: "after" }
    )

    return result.value
  } catch (error) {
    throw new Error(error)
  }
}

const getBoardById = async (id) => {
  try {
    const result = await getInstanceConnection()
      .collection(boardCollectionName)
      .aggregate([
        { $match: { _id: ObjectId(id), _destroy: false } },
        {
          $lookup: {
            from: ColumnModel.columnCollectionName,
            localField: "_id",
            foreignField: "boardId",
            as: "columns",
          },
        },
        {
          $unwind: {
            path: "$columns",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: CardModel.cardCollectionName,
            localField: `columns._id`,
            foreignField: "columnId",
            as: "cards",
          },
        },
        {
          $group: {
            _id: "$_id",
            title: { $first: "$title" },
            columnOrder: { $first: "$columnOrder" },
            createdAt: { $first: "$createdAt" },
            updatedAt: { $first: "$updatedAt" },
            _destroy: { $first: "$_destroy" },
            columns: {
              $push: {
                _id: "$columns._id",
                boardId: "$columns.boardId",
                title: "$columns.title",
                createdAt: "$columns.createdAt",
                updatedAt: "$columns.updatedAt",
                _destroy: "$columns._destroy",
                cardOrder: "$columns.cardOrder",
                cards: "$cards",
              },
            },
          },
        },
      ])
      .toArray()

    return result?.[0]
  } catch (error) {
    throw new Error(error)
  }
}

export const BoardModel = { createNew, update, pushColumnOrder, getBoardById }
