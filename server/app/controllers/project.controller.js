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
}

export default new ProjectController()
