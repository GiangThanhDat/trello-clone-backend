import { ColumnModel } from "../models/column.model"

const createNew = async (data) => {
  try {
    const result = await ColumnModel.createNew(data)
    return result
  } catch (error) {
    throw new Error(error)
  }
}

export const ColumnService = { createNew }
