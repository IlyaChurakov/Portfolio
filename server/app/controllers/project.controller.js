import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import ProjectService from '../services/Project.service.js'

class ProjectController {
	async createProject(req, res, next) {
		try {
			const { name, archived, previewImage, labels } = req.params

			const project = await ProjectService.createProject({
				name,
				archived,
				previewImage,
				labels
			})

			res.json(project)
		} catch (err) {
			next(err)
		}
	}
	async getProject(req, res, next) {
		try {
			const { id } = req.params
			const project = await ProjectService.getProject(id)
			res.json(project)
		} catch (err) {
			next(err)
		}
	}
	async getProjectList(req, res, next) {
		try {
			const projects = await ProjectService.getProjectList()
			res.json(projects)
		} catch (err) {
			next(err)
		}
	}
	async getLastProjects(req, res, next) {
		try {
			const count = parseInt(req.params.count)
			const projects = await ProjectService.getLastProjects(count)
			res.json(projects)
		} catch (err) {
			next(err)
		}
	}
	async deleteProjectById(req, res, next) {
		try {
			const id = req.params.id
			const project = await ProjectService.deleteProjectById(id)
			res.json(project)
		} catch (err) {
			next(err)
		}
	}
	async deleteAllProjects(req, res, next) {
		try {
			const projects = await ProjectService.deleteAllProjects()
			res.json(projects)
		} catch (err) {
			next(err)
		}
	}
	async saveProject(req, res, next) {
		try {
			const project = req.body.project
			const savedProject = await ProjectService.saveProject(project)
			res.json(savedProject)
		} catch (err) {
			next(err)
		}
	}
	async archiveProject(req, res, next) {
		try {
			const { id, bool } = req.body
			const savedProject = await ProjectService.archiveProject(id, bool)

			res.json(savedProject)
		} catch (err) {
			next(err)
		}
	}
	async assignPreview(req, res, next) {
		try {
			const { id } = req.params
			const { fileName } = req.body

			const project = await ProjectService.assignPreview(id, fileName)

			return res.json(project)
		} catch (err) {
			next(err)
		}
	}

	async uploadImage(req, res, next) {
		try {
			if (!req.files)
				return res.status(400).json({ message: 'No file uploaded' })

			const { file } = req.files

			if (!file) return res.json({ error: 'Incorrect input name' })

			const fileName = uuidv4() + '.' + file.name.split('.')[1]

			const filePath = path.resolve('static', fileName)

			file.mv(filePath, err => {
				if (err) {
					console.error(err)
					return res.status(500).send(err)
				}

				res.json({
					name: file.name,
					type: file.type,
					path: fileName,
					size: file.size
				})
			})
		} catch (err) {
			next(err)
		}
	}
}

export default new ProjectController()
