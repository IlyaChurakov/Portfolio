import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import ApiError from '../errors/api.error.js'
import FileService from '../services/File.service.js'
import ProjectService from '../services/Project.service.js'

class ProjectController {
	async createProject(req, res, next) {
		try {
			const { name } = req.params
			const { type } = req.body
			const project = await ProjectService.createProject({
				name,
				type
			})

			res.json(project)
		} catch (err) {
			next(err)
		}
	}
	async getProject(req, res, next) {
		try {
			const { id } = req.params
			const project = await ProjectService.getProjectById(id)
			res.json(project)
		} catch (err) {
			next(err)
		}
	}
	async getProjectList(req, res, next) {
		try {
			const user = req.user
			const { count } = req.query

			// const count = parseInt(req.params.count)
			const type = req.query.type

			const projects = await ProjectService.getProjectList(
				{ count, type },
				user
			)
			return res.json(projects)
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

	async saveProject(req, res, next) {
		try {
			const newProject = req.body.project
			const currentProject = await ProjectService.getProjectById(newProject.id)

			const newPreview = newProject.previewImage
			const currentPreview = currentProject.previewImage

			if (currentPreview && newPreview !== currentPreview)
				await FileService.deleteFiles([currentPreview])

			const savedProject = await ProjectService.saveProject(newProject)
			res.json(savedProject)
		} catch (err) {
			next(err)
		}
	}
	async archiveProject(req, res, next) {
		try {
			const { id, bool } = req.body
			const savedProject = await ProjectService.archiveProjectById(id, bool)

			res.json(savedProject)
		} catch (err) {
			next(err)
		}
	}

	async deleteFiles(req, res, next) {
		try {
			const { files } = req.body
			console.log(req.body)
			await ProjectService.deleteFiles(files)

			res.status(200).json({ deletedFiles: files })
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

			if (file.size > 2 * 1048576)
				throw ApiError.BadRequest('Файл слишком большой, выберите файл < 1Мб')

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
