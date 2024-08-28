import express from 'express'
import { UserControllers } from '../controllers/UserControllers'
import { authenticate } from '../middleware/auth'

const router = express.Router()

router.get('/list-user',authenticate, UserControllers.getUsers)
router.get('/:id', authenticate, UserControllers.getUserById)
router.delete('/:userId', authenticate, UserControllers.deleteUser)

export default router