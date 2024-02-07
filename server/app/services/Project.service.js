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
					orderBy: { createdAt: 'asc' },
					include: {
						blocks: {
							orderBy: { createdAt: 'asc' }
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
	async getLastProjects(count) {
		return await prisma.project.findMany({
			orderBy: {
				createdAt: 'desc'
			},
			take: count
		})
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
	async saveProject({ id, sections, ...projectData }) {
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
						({
							id: sectionId = uuidv4(),
							blocks = [],
							name,
							paddings,
							backgroundPath
						}) => ({
							where: { id: sectionId },
							create: { name, paddings, backgroundPath },
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
										({
											id: blockId = uuidv4(),
											color,
											text,
											type,
											imgPath,
											imgDescr
										}) => ({
											where: { id: blockId },
											create: { color, text, type, imgPath, imgDescr },
											update: { color, text, type, imgPath, imgDescr }
										})
									)
								}
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
