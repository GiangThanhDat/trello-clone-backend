import { ColumnModel } from "../models/column.model"

const createNew = async (data) => {
  try {
    const result = await ColumnModel.createNew(data)
    return result
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
