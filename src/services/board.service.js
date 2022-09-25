import { BoardModel } from "../models/board.model"

const createNew = async (data) => {
  try {
    const result = await BoardModel.createNew(data)
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const update = async (id, data) => {
  try {
    if (data.columns) {
      delete data.columns
    }

    const result = await BoardModel.update(id, {
      ...data,
      updatedAt: Date.now(),
    })
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const getBoardById = async (id) => {
  try {
    const board = await BoardModel.getBoardById(id)

    if (board === undefined) {
      throw new Error("No board data")
    }

    // // remove destroyed columns
    const columns = board.columns.filter(({ _destroy }) => !_destroy)
    // remove destroyed cards
    columns.forEach((column) => {
      column.cards = column.cards.filter(({ _destroy }) => !_destroy)
    })

    return { ...board, columns }
  } catch (error) {
    throw new Error(error)
  }
}

export const BoardService = { createNew, update, getBoardById }
