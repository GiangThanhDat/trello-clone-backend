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

    // remove destroyed columns
    let result = {
      ...board,
      columns: board.columns.filter(({ _destroy }) => !_destroy),
    }

    if (board.columnOrder.length === 0) {
      // columns is empty
      return { ...result, columns: [] }
    }

    return result
  } catch (error) {
    throw new Error(error)
  }
}

export const BoardService = { createNew, update, getBoardById }
