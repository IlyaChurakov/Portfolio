import { Router } from 'express'
import projectController from '../controllers/project.controller.js'
import AuthMiddleware from '../middlewares/Auth.middleware.js'
import UserMiddleware from '../middlewares/User.middleware.js'

const router = new Router()

router.get('/', projectController.getProjectList)
router.get('/last/:count', UserMiddleware, projectController.getLastProjects)
router.get('/:id', projectController.getProject)
router.delete('/files', projectController.deleteFiles)
router.delete('/:id', projectController.deleteProjectById)

router.post('/assign-preview/:id', projectController.assignPreview)
router.post('/upload-image', projectController.uploadImage)
router.post('/save', AuthMiddleware, projectController.saveProject)
router.post('/:name', AuthMiddleware, projectController.createProject)
router.put('/archive', AuthMiddleware, projectController.archiveProject)

router.delete('/', AuthMiddleware, projectController.deleteAllProjects)

export default router
