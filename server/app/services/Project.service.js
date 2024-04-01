import fs from 'fs'
import path from 'path'
import { prisma } from '../utils/prisma.js'

class ProjectService {
	async createProject({ name, archived, previewImage, labels }) {
		return await prisma.project.create({
			data: {
				name,
				archived,
				previewImage,
				labels
			},
			include: {
				sections: {
					include: {
						blocks: true
					}
				}
			}
		})
	}
	async getProject(id) {
		return await prisma.project.findUnique({
			where: {
				id
			},
			include: {
				sections: {
					orderBy: { serial: 'asc' },
					include: {
						blocks: {
							orderBy: { serial: 'asc' }
						}
					}
				}
			}
		})
	}
	async getProjectList() {
		return await prisma.project.findMany({
			orderBy: {
				createdAt: 'desc'
			}
		})
	}
	async getLastProjects(count, user) {
		if (!user || !user.roles.includes('admin')) {
			return await prisma.project.findMany({
				where: {
					archived: false || null
				},
				orderBy: {
					createdAt: 'desc'
				},
				take: count
			})
		} else {
			return await prisma.project.findMany({
				orderBy: {
					createdAt: 'desc'
				},
				take: count
			})
		}
	}
	async deleteProjectById(id) {
		return await prisma.project.delete({
			where: {
				id
			}
		})
	}
	async archiveProject(id, bool) {
		return await prisma.project.update({
			where: {
				id
			},
			data: {
				archived: bool
			}
		})
	}
	async deleteAllProjects() {
		return await prisma.project.deleteMany()
	}
	async deleteFiles(files) {
		for (let fileName of files) {
			const filePath = path.resolve('static', fileName)
			fs.unlink(filePath, err => {
				if (err) throw err
				console.log('Deleted')
			})
		}
	}
	async saveProject(receivedProject) {
		const { id: receivedId, sections, ...receivedProjectData } = receivedProject

		const currentProject = await this.getProject(receivedId)

		const currentSections = currentProject.sections
		const receivedSections = receivedProject.sections

		const deleteOutdatedFile = async (current, received, key) => {
			if (received) {
				const currentImage = current[key]
				const receivedImage = received[key]

				const isExistAndChangedCurrentBg =
					currentImage && currentImage !== receivedImage
				if (isExistAndChangedCurrentBg) await this.deleteFiles([currentImage])
			} else {
				const currentImage = current[key]
				if (currentImage) await this.deleteFiles([currentImage])
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

		return await prisma.project.update({
			where: {
				id: receivedId
			},
			data: {
				...receivedProjectData,
				sections: {
					deleteMany: {
						NOT: receivedSections.map(({ id: sectionId }) => ({
							id: sectionId
						}))
					},
					upsert: receivedSections.map(
						(
							{ id: sectionId, blocks = [], name, paddings, backgroundPath },
							index
						) => ({
							where: { id: sectionId },
							create: {
								name,
								paddings,
								backgroundPath,
								blocks: {
									create: blocks.map(({ sectionId, ...block }) => ({
										...block,
										serial: index
									}))
								},
								serial: index
							},
							update: {
								name,
								paddings,
								backgroundPath,
								blocks: {
									deleteMany: {
										NOT: blocks.map(({ id: blockId }) => ({
											id: blockId
										}))
									},
									upsert: blocks.map(
										(
											{ id: blockId, color, text, type, imgPath, imgDescr },
											index
										) => ({
											where: { id: blockId },
											create: {
												color,
												text,
												type,
												imgPath,
												imgDescr,
												serial: index
											},
											update: {
												color,
												text,
												type,
												imgPath,
												imgDescr,
												serial: index
											}
										})
									)
								},
								serial: index
							}
						})
					)
				}
			},
			include: {
				sections: {
					orderBy: { serial: 'asc' },
					include: {
						blocks: {
							orderBy: { serial: 'asc' }
						}
					}
				}
			}
		})
	}
	async assignPreview(id, image) {
		return await prisma.project.update({
			where: {
				id
			},
			data: {
				previewImage: image
			},
			include: {
				sections: {
					include: {
						blocks: true
					}
				}
			}
		})
	}
}

export default new ProjectService()
