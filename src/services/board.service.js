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
    const result = await BoardModel.getBoardById(id)

    return result
  } catch (error) {
    throw new Error(error)
  }
}

export const BoardService = { createNew, update, getBoardById }
