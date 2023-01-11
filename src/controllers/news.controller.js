import {
  createService,
  findAllService,
  countNews,
  topNewsService,
  findByIdService,
  searchByTitleService,
  byUserService,
  updateService,
  eraseService,
} from '../services/news.service.js'

export const create = async (req, res) => {
  try {
    const { title, text, banner } = req.body

    if (!title || !text || !banner) {
      res.status(400).send({ message: 'submit all fields for registration' })
    }

    await createService({
      title,
      text,
      banner,
      user: req.userId,
    })

    res.sendStatus(201)
  } catch (error) {
    res.sendStatus(500)
  }
}

export const findAll = async (req, res) => {
  try {
    let { limit, offset } = req.query

    limit = Number(limit)
    offset = Number(offset)

    if (!limit) {
      limit = 5
    }

    if (!offset) {
      offset = 0
    }

    const news = await findAllService(offset, limit)
    const total = await countNews()
    const currentUrl = req.baseUrl

    const next = offset + limit
    const nextUrl =
      next < total ? `${currentUrl}?limit=${next}&offset=${offset}` : null

    const previous = offset - limit < 0 ? null : offset - limit
    const previousUrl =
      previous != null
        ? `${currentUrl}?limit=${limit}&offset=${previous}`
        : null

    if (news.length === 0) {
      res.sendStatus(400)
    }

    res.send({
      nextUrl,
      previousUrl,
      limit,
      offset,
      total,

      results: news.map((newsItem) => ({
        id: newsItem._id,
        title: newsItem.title,
        text: newsItem.text,
        banner: newsItem.banner,
        likes: newsItem.likes,
        comments: newsItem.comments,
        name: newsItem.user.name,
        username: newsItem.user.username,
        userAvatar: newsItem.user.avatar,
      })),
    })
  } catch (error) {
    res.sendStatus(500)
  }
}

export const topNews = async (req, res) => {
  try {
    const news = await topNewsService()

    if (!news) {
      return res.status(400).send({ message: 'Noticia nao encontrada' })
    }

    return res.send({
      news: {
        id: news._id,
        title: news.title,
        text: news.text,
        banner: news.banner,
        likes: news.likes,
        comments: news.comments,
        name: news.user.name,
        username: news.user.username,
        userAvatar: news.user.avatar,
      },
    })
  } catch (error) {
    res.sendStatus(500)
  }
}

export const findById = async (req, res) => {
  try {
    const { id } = req.params

    const news = await findByIdService(id)

    return res.send({
      news: {
        id: news._id,
        title: news.title,
        text: news.text,
        banner: news.banner,
        likes: news.likes,
        comments: news.comments,
        name: news.user.name,
        username: news.user.username,
        userAvatar: news.user.avatar,
      },
    })
  } catch (error) {
    res.sendStatus(500)
  }
}

export const searchByTitle = async (req, res) => {
  try {
    const { title } = req.query

    const news = await searchByTitleService(title)

    if (news.length === 0) {
      return res.sendStatus(400)
    }

    return res.send({
      results: news.map((itemNews) => ({
        id: itemNews._id,
        title: itemNews.title,
        text: itemNews.text,
        banner: itemNews.banner,
        likes: itemNews.likes,
        comments: itemNews.comments,
        name: itemNews.user.name,
        username: itemNews.user.username,
        userAvatar: itemNews.user.avatar,
      })),
    })
  } catch (error) {
    res.sendStatus(500)
  }
}

export const byUser = async (req, res) => {
  try {
    const id = req.userId
    const news = await byUserService(id)

    return res.send({
      results: news.map((i) => ({
        id: i._id,
        title: i.title,
        text: i.text,
        banner: i.banner,
        likes: i.likes,
        comments: i.comments,
        name: i.user.name,
        username: i.user.username,
        userAvatar: i.user.avatar,
      })),
    })
  } catch (error) {
    res.sendStatus(500)
  }
}

export const update = async (req, res) => {
  try {
    const { title, text, banner } = req.body
    const { id } = req.params

    if (!title && !text && !banner) {
      res.status(400).send({ message: 'submit all fields for registration' })
    }

    const news = await findByIdService(id)

    

    if (String(news.user._id) !== req.userId) {
      return res
        .status(400)
        .send({ message: 'voce não pode alterar essa noticia' })
    }

    await updateService(id, title, text, banner)

    return res.send({ message: 'Update com sucesso' })
  } catch (error) {
    res.sendStatus(500)
  }
}

export const erase = async (req, res) => {
  try {
    const {id} = req.params;

    const news= await findByIdService(id)

    if (String(news.user._id) !== req.userId) {
      return res.status(400).send({
        message: "voce não pode deletar essa noticia "
      })
    }

    await eraseService(id)

    return res.send({message: "deletado!"})
  } catch (error) {
    
  }
}