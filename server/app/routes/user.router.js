import { Router } from 'express'
import userController from '../controllers/user.controller.js'

const router = new Router()

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/', userController.getAllUsers)

export default router
