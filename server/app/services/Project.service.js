import { prisma } from '../utils/prisma.js'

class ProjectService {
	async createProject(name) {
		return await prisma.project.create({
			data: {
				name
			}
		})
	}
	async getProjectList() {
		return await prisma.project.findMany()
	}
	async getProject(id) {
		const project = await prisma.project.findUnique({
			where: {
				id
			}
		})
		return project
	}
	async saveProject(project) {
		return await prisma.project.update({
			where: {
				id: project.id
			},
			data: {
				content: project.content
			}
		})
	}
	async deleteAllProjects() {
		return await prisma.project.deleteMany()
	}
}

export default new ProjectService()
