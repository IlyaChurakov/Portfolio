import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import ProjectService from '../services/Project.service.js'

class ProjectController {
	async createProject(req, res, next) {
		try {
			const { name } = req.params

			const project = await ProjectService.createProject(name)
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
	async getProject(req, res, next) {
		try {
			const { id } = req.params

			const project = await ProjectService.getProject(id)
			res.json(project)
		} catch (err) {
			next(err)
		}
	}
	async saveProject(req, res, next) {
		try {
			const { project: newProject } = req.body
			const project = await ProjectService.saveProject(newProject)
			res.json(project)
		} catch (err) {
			next(err)
		}
	}
	async uploadPreview(req, res, next) {
		try {
			const { id } = req.params
			const { img } = req.files

			const fileName = uuidv4() + '.jpg'

			img.mv(path.resolve('static', fileName))

			const project = await ProjectService.uploadPreview(id, fileName)
			console.log(project)
			return res.json(project)
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
}

export default new ProjectController()
