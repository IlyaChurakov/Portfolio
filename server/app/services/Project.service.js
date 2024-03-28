import fs from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
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
	async saveProject({ id, sections, ...projectData }) {
		const currentProject = await this.getProject(id)
		const currentSections = currentProject.sections

		for (let currentSection of currentSections) {
			const newSection = sections.find(
				section => section.id === currentSection.id
			)

			if (newSection) {
				const currentBg = currentSection.backgroundPath
				const newBg = newSection.backgroundPath

				if (currentBg && currentBg !== newBg) {
					await this.deleteFiles([currentBg])
				}
			}

			const currentBlocks = currentSection.blocks
			const newBlocks = newSection.blocks

			console.log(currentBlocks)
			console.log(newBlocks)

			// FIXME: разные id нового и старого блоков до перезагрузки

			for (let currentBlock of currentBlocks) {
				const newBlock = newBlocks.find(block => block.id === currentBlock.id)
				console.log(currentBlock.type, newBlock?.type)

				if (newBlock) {
					const currentImg = currentBlock.imgPath
					const newImg = newBlock.imgPath
					if (currentImg && currentImg !== newImg) {
						await this.deleteFiles([currentImg])
					}
				}
			}
		}

		return await prisma.project.update({
			where: {
				id
			},
			data: {
				...projectData,
				sections: {
					deleteMany: {
						NOT: sections.map(({ id: sectionId = uuidv4() }) => ({
							id: sectionId
						}))
					},
					upsert: sections.map(
						(
							{
								id: sectionId = uuidv4(),
								blocks = [],
								name,
								paddings,
								backgroundPath
							},
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
										NOT: blocks.map(({ id: blockId = uuidv4() }) => ({
											id: blockId
										}))
									},
									upsert: blocks.map(
										(
											{
												id: blockId = uuidv4(),
												color,
												text,
												type,
												imgPath,
												imgDescr
											},
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
					include: {
						blocks: true
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
