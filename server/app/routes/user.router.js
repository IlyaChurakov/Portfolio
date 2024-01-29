import { Router } from 'express'
import userController from '../controllers/user.controller.js'
import AuthMiddleware from '../middlewares/Auth.middleware.js'

const router = new Router()

router.get('/', AuthMiddleware, userController.getAllUsers)
router.delete('/:id', userController.deleteUser)
router.patch('/delete-role/:id', userController.deleteRole)
router.patch('/add-role/:id', userController.addRole)
router.get('/activate/:link', userController.activate)
router.post('/assign-avatar/:id', userController.assignAvatar)
router.post('/change-description/:id', userController.addDescription)

export default router
