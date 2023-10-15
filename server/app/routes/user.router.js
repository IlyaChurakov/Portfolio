import { Router } from 'express'
import userController from '../controllers/user.controller.js'

const router = new Router()

router.post('/registration', userController.registration)

export default router
