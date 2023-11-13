import { Router } from 'express'
import projectController from '../controllers/project.controller.js'
import AuthMiddleware from '../middlewares/Auth.middleware.js'

const router = new Router()

router.get('/', projectController.getProjectList)
router.get('/:id', projectController.getProject)

router.post('/upload-preview/:id', projectController.uploadPreview)
router.post('/save', AuthMiddleware, projectController.saveProject)
router.post('/:name', AuthMiddleware, projectController.createProject)

router.delete('/', AuthMiddleware, projectController.deleteAllProjects)

export default router
