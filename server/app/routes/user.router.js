import { Router } from 'express'
import userController from '../controllers/user.controller.js'
import AuthMiddleware from '../middlewares/Auth.middleware.js'

const router = new Router()

// Private
router.get('/', AuthMiddleware, userController.getAllUsers)
router.delete('/:id', AuthMiddleware, userController.deleteUser)
router.patch('/delete-role/:id', AuthMiddleware, userController.deleteRole)
router.patch('/add-role/:id', AuthMiddleware, userController.addRole)
router.get('/activate/:link', AuthMiddleware, userController.activate)
router.post('/reset-mail', AuthMiddleware, userController.sendResetMail)
router.put('/update', AuthMiddleware, userController.updateUser)

// Public
router.post('/change-password', userController.changePassword)
export default router
