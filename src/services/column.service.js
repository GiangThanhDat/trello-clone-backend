import { BoardModel } from "../models/board.model"
import { ColumnModel } from "../models/column.model"

const createNew = async (data) => {
  try {
    const newColumn = await ColumnModel.createNew(data)
    await BoardModel.pushColumnOrder(
      newColumn.boardId.toString(),
      newColumn._id.toString()
    )
    return { ...newColumn, cards: [] }
  } catch (error) {
    throw new Error(error)
  }
}

const update = async (id, data) => {
  try {
    const updateColumnData = { ...data, updatedAt: Date.now() }

    // cache cards for result
    let cards = []

    if (updateColumnData.cards) {
      // remove cards for normalization column object
      cards = updateColumnData.cards
      delete updateColumnData.cards
    }

    const result = await ColumnModel.update(id, updateColumnData)

    return { ...result, cards }
  } catch (error) {
    throw new Error(error)
  }
}

export const ColumnService = { createNew, update }
