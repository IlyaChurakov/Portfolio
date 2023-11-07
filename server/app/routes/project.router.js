import { Router } from 'express'
import projectController from '../controllers/project.controller.js'
import AuthMiddleware from '../middlewares/Auth.middleware.js'

const router = new Router()

router.get('/', projectController.getProjectList)
router.get('/:id', projectController.getProject)
router.post('/:name', AuthMiddleware, projectController.createProject)

export default router
