import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import userService from '../services/user.service.js'

dotenv.config()

export const authMiddleware = async (req, res, next) => {
  try {
    const { authorization } = req.headers

    if (!authorization) {
      return res.sendStatus(401)
    }

    const parts = authorization.split(' ')

    if (parts.length !== 2) {
      return res.sendStatus(401)
    }

    const [schema, token] = parts

    if (schema !== 'Bearer') {
      return res.sendStatus(401)
    }

    jwt.verify(token, process.env.SECRET_JWT, async (error, decoded) => {
      if (error) {
        return res.status(401).send({ message: 'Token Invalid' })
      }

      const user = await userService.findByIdService(decoded.id)

      if (!user || !user.id) {
        return res.status(401).send({ message: 'Token Invalid' })
      }

      req.userId = user.id
      return next()
    })
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}
