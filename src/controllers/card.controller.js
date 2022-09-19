import { CardService } from "../services/card.service"
import { HttpStatusCode } from "../utilities/constant"

const createNew = async (req, res) => {
  try {
    const result = await CardService.createNew(req.body)
    res.status(HttpStatusCode.OK).json(result)
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({ error: error.message })
  }
}

const update = async (req, res) => {
  try {
    const { id } = req.params
    const result = await CardService.update(id, req.body)
    res.status(HttpStatusCode.OK).json(result)
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({ error: error.message })
  }
}

export const CardController = { createNew, update }
