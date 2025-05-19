import express from 'express'
import { login, register, protectedRoute } from '../controllers/authController.js'
import { authenticate } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/protected', authenticate, protectedRoute)

export default router