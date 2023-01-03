import userService from '../services/user.service.js'

const create = async (req, res) => {
  try {
    const { name, username, email, password, avatar, background } = req.body

    if (!name || !username || !email || !password || !avatar || !background) {
      res.status(400).send({ message: 'envie todos os dados necessários' })
    }

    const user = await userService.createService(req.body)

    if (!user) {
      return res.status(400).send({ message: 'erro ao criar usuario' })
    }

    res.status(201).send({
      message: 'Usuário cadastrado com sucesso',
      user: {
        id: user._id,
        name,
        username,
        email,
        avatar,
        background,
      },
    })
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

const findAll = async (req, res) => {
  try {
    const users = await userService.findAllService()

    if (!users.length === 0) {
      return res.status(400).send({ message: 'não há usuários' })
    }

    res.send(users)
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

const findById = async (req, res) => {
  const user = req.user
  res.send(user)
}

const update = async (req, res) => {
  try {
    const { name, username, email, password, avatar, background } = req.body

    if (!name && !username && !email && !password && !avatar && !background) {
      res.status(400).send({ message: 'altera alguma coisa pelo menos né' })
    }

    const { id, user } = req

    await userService.updateService(
      id,
      name,
      username,
      email,
      password,
      avatar,
      background,
    )

    res.send({ message: 'Alteração concluida!' })
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

export  { create, findAll, findById, update }
