import { createService, findAllService } from '../services/news.service'

const create = async (req, res) => {
  try {
    const { title, text, banner } = req.body

    if (!title || !text || !banner) {
      res.status(400).send({ message: 'submit all fields for registration' })
    }

    await createService({
      title,
      text,
      banner,
      id: 'id fake',
    })

    res.send(201)
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

const findAll = async (req, res) => {
  const news = []

  res.send(201)
}

export { create, findAll }
