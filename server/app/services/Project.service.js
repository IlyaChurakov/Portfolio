import { prisma } from '../utils/prisma.js'

class ProjectService {
	async createProject(name) {
		const project = await prisma.project.create({
			data: {
				name,
				content: JSON.stringify({ sections: [] })
			}
		})

		project.content = JSON.parse(project.content)

		return project
	}
	async getProjectList() {
		const projects = await prisma.project.findMany({
			orderBy: {
				createdAt: 'desc'
			}
		})

		projects.forEach(project => {
			project.content = JSON.parse(project.content)
		})

		return projects
	}
	async getLastProjects(count) {
		return await prisma.project.findMany({
			orderBy: {
				createdAt: 'desc'
			},
			take: count
		})
	}
	async getProject(id) {
		const project = await prisma.project.findUnique({
			where: {
				id
			}
		})

		project.content = JSON.parse(project.content)

		return project
	}
	async saveProject(project) {
		const savedProject = await prisma.project.update({
			where: {
				id: project.id
			},
			data: {
				content: JSON.stringify(project.content)
			}
		})

		savedProject.content = JSON.parse(savedProject.content)

		return savedProject
	}
	async assignPreview(id, image) {
		const project = await prisma.project.update({
			where: {
				id
			},
			data: {
				previewImage: image
			}
		})

		project.content = JSON.parse(project.content)

		return project
	}
	async deleteProjectById(id) {
		return await prisma.project.delete({
			where: {
				id
			}
		})
	}
	async deleteAllProjects() {
		return await prisma.project.deleteMany()
	}
}

export default new ProjectService()
