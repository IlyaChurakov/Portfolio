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
	// async createSection({ name, background, paddings, blocks, projectId }) {
	// 	return await prisma.section.create({
	// 		data: {
	// 			projectId,
	// 			name,
	// 			background,
	// 			paddings,
	// 			blocks
	// 		}
	// 	})
	// }
	// async createBlock({ sectionId, color, text, type }) {
	// 	return await prisma.block.create({
	// 		data: {
	// 			sectionId,
	// 			color,
	// 			text,
	// 			type
	// 		}
	// 	})
	// }
	async getProject(id) {
		return await prisma.project.findUnique({
			where: {
				id
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
					upsert: sections.map(
						({
							id: sectionId = uuidv4(),
							blocks = [],
							name,
							paddings,
							background
						}) => ({
							where: { id: sectionId },
							create: { name, paddings, background },
							update: {
								name,
								paddings,
								background,
								blocks: {
									upsert: blocks.map(
										({ id: blockId = uuidv4(), color, text, type }) => ({
											where: { id: blockId },
											create: { color, text, type },
											update: { color, text, type }
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
