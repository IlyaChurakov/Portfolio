import { Router } from 'express'
import projectController from '../controllers/project.controller.js'
import AuthMiddleware from '../middlewares/Auth.middleware.js'

const router = new Router()

router.get('/', AuthMiddleware, projectController.getProjectList)
router.get('/:id', AuthMiddleware, projectController.getProject)
router.post('/:name', AuthMiddleware, projectController.createProject)

export default router
