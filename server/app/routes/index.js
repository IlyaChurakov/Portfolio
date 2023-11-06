import { Router } from 'express'
import authRoutes from './auth.router.js'
import projectRoutes from './project.router.js'
import userRoutes from './user.router.js'

const router = new Router()

router.use('/auth', authRoutes)
router.use('/user', userRoutes)
router.use('/projects', projectRoutes)

export default router
