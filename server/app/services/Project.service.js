import ProjectRepository from '../repository/Project.repository.js'
import { prisma } from '../utils/prisma.js'
import FileService from './File.service.js'

class ProjectService {
	async createProject(project) {
		return await ProjectRepository.createProject(project)
	}

	async getProjectById(id) {
		return await ProjectRepository.getProject({ id })
	}

	async getProjectList({ count, type }, user) {
		if (!user || !user.roles.includes('admin')) {
			return await ProjectRepository.getProjectList({
				where: {
					archived: false || null,
					type
				},
				orderBy: { createdAt: 'desc' },
				take: count || undefined
			})
		} else {
			return await prisma.project.findMany({
				where: {
					type
				},
				orderBy: {
					createdAt: 'desc'
				},
				take: count || undefined
			})
		}
	}

	async deleteProjectById(id) {
		return await ProjectRepository.deleteProject({ id })
	}

	async archiveProjectById(id, bool) {
		return await ProjectRepository.updateProject({ id, archived: bool })
	}

	async saveProject(receivedProject) {
		const currentProject = await this.getProjectById(receivedProject.id)

		const currentSections = currentProject.sections
		const receivedSections = receivedProject.sections

		const deleteOutdatedFile = async (current, received, key) => {
			if (received) {
				const currentImage = current[key]
				const receivedImage = received[key]

				const isExistAndChangedCurrentBg =
					currentImage && currentImage !== receivedImage
				if (isExistAndChangedCurrentBg)
					await FileService.deleteFiles([currentImage])
			} else {
				const currentImage = current[key]
				if (currentImage) await FileService.deleteFiles([currentImage])
			}
		}

		for (let currentSection of currentSections) {
			const findedReceivedSection = receivedSections.find(
				({ id }) => id === currentSection.id
			)

			await deleteOutdatedFile(
				currentSection,
				findedReceivedSection,
				'backgroundPath'
			)

			const currentBlocks = currentSection.blocks
			const receivedBlocks = findedReceivedSection?.blocks

			for (let currentBlock of currentBlocks) {
				const findedReceivedBlock = receivedBlocks?.find(
					({ id }) => id === currentBlock.id
				)

				await deleteOutdatedFile(currentBlock, findedReceivedBlock, 'imgPath')
			}
		}

		return await ProjectRepository.saveProject(receivedProject)
	}
}

export default new ProjectService()
