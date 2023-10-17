import { Router } from 'express'
import userController from '../controllers/user.controller.js'
import AuthMiddleware from '../middlewares/Auth.middleware.js'

const router = new Router()

router.get('/', AuthMiddleware, userController.getAllUsers)
router.delete('/:id', userController.deleteUser)
router.get('/activate/:link', userController.activate)

export default router
