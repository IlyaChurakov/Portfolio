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
		return await prisma.project.findUnique({
			where: {
				id
			}
		})
	}
}

export default new ProjectService()
