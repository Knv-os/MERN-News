import { createService, findAllService } from '../services/news.service.js'

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
      user: { _id: '63b3371a01ec7a21fdf066af' },
    })

    res.sendStatus(201)
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

const findAll = async (req, res) => {

  const news = await findAllService()
  if (news.length === 0) {
    res.statusSend(400)
  }
  res.send(news)
}

export { create, findAll }
