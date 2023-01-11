import { Router } from 'express'
import {
  create,
  findAll,
  topNews,
  searchByTitle,
  findById,
  byUser,
  update,
  erase
} from '../controllers/news.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'

const router = Router()

router.post('/', authMiddleware, create)
router.get('/', findAll)
router.get('/top', topNews)
router.get('/search', searchByTitle)
router.get('/byUser', authMiddleware, byUser)
router.get('/:id', authMiddleware, findById)
router.patch('/:id', authMiddleware, update)
router.delete('/:id', authMiddleware, erase)

export default router
