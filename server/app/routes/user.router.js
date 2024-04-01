import { Router } from 'express'
import userController from '../controllers/user.controller.js'
import AuthMiddleware from '../middlewares/Auth.middleware.js'

const router = new Router()

router.get('/', AuthMiddleware, userController.getAllUsers)
router.delete('/:id', userController.deleteUser)
router.patch('/delete-role/:id', userController.deleteRole)
router.patch('/add-role/:id', userController.addRole)
router.get('/activate/:link', userController.activate)
router.post('/reset-mail', userController.sendResetMail)
router.post('/change-password', userController.changePassword)
router.put('/update', userController.updateUser)

export default router
