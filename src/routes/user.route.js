import { Router } from 'express'
import { create, findAll, findById, update } from '../controllers/user.controller.js'
import { validId, validUser } from '../middleware/global.middleware.js'

const router = Router()

router.post('/', create)
router.get('/', findAll)
router.get('/:id', validId, validUser, findById)
router.patch('/:id', validId, validUser, update)

export default router
