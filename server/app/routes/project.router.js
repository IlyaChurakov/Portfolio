import { Router } from 'express'
import projectController from '../controllers/project.controller.js'
import AuthMiddleware from '../middlewares/Auth.middleware.js'

const router = new Router()

// TODO: привести роуты в порядок, добавить query параметры

// Public
router.get('/', projectController.getProjectList)
router.get('/:id', projectController.getProject)
router.get('/last/:count', projectController.getProjectList)

// Private
router.delete('/files', AuthMiddleware, projectController.deleteFiles)
router.delete('/:id', AuthMiddleware, projectController.deleteProjectById)
router.post('/upload-image', AuthMiddleware, projectController.uploadImage)
router.post('/save', AuthMiddleware, projectController.saveProject)
router.post('/:name', AuthMiddleware, projectController.createProject)
router.put('/archive', AuthMiddleware, projectController.archiveProject)

export default router
