import { BoardModel } from "../models/board.model"
import { ColumnModel } from "../models/column.model"

const createNew = async (data) => {
  try {
    const newColumn = await ColumnModel.createNew(data)

    await BoardModel.pushColumnOrder(
      newColumn.boardId.toString(),
      newColumn._id.toString()
    )

    return newColumn
  } catch (error) {
    throw new Error(error)
  }
}

const update = async (id, data) => {
  try {
    const result = await ColumnModel.update(id, {
      ...data,
      updatedAt: Date.now(),
    })
    return result
  } catch (error) {
    throw new Error(error)
  }
}

export const ColumnService = { createNew, update }
