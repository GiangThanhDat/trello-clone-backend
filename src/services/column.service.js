import { BoardModel } from "../models/board.model"
import { CardModel } from "../models/card.model"
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

    const updatedColumn = await ColumnModel.update(id, updateColumnData)

    // remove all cards in database of the columns  to be removed
    if (updatedColumn._destroy) {
      await CardModel.updateMany(updatedColumn.cardOrder, { _destroy: true })
      cards = []
    }

    return { ...updatedColumn, cards }
  } catch (error) {
    throw new Error(error)
  }
}

export const ColumnService = { createNew, update }
