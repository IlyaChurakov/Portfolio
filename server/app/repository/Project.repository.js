import { prisma } from '../utils/prisma.js'

export default {
	createProject: async project => {
		return await prisma.project.create({
			data: {
				...project
			},
			include: {
				sections: {
					include: {
						blocks: true
					}
				}
			}
		})
	},
	getProject: async project => {
		return await prisma.project.findUnique({
			where: {
				...project
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
	},
	deleteProject: async project => {
		return await prisma.project.delete({
			where: {
				...project
			}
		})
	},
	getProjectList: async ({ where, orderBy, take }) => {
		return await prisma.project.findMany({
			where: {
				...where
			},
			orderBy: {
				...orderBy
			},
			take
		})
	},
	updateProject: async ({ id, sections, ...project }) => {
		return await prisma.project.update({
			where: {
				id
			},
			data: {
				sections,
				...project
			}
		})
	},
	saveProject: async ({ id, sections, ...project }) => {
		return await prisma.project.update({
			where: {
				id
			},
			data: {
				...project,
				sections: {
					deleteMany: {
						NOT: sections.map(section => ({
							id: section.id
						}))
					},
					upsert: sections.map(
						({ id, blocks = [], projectId, ...section }, index) => ({
							where: { id },
							create: {
								...section,
								serial: index,
								blocks: {
									create: blocks.map(({ sectionId, ...block }, index) => ({
										...block,
										serial: index
									}))
								}
							},
							update: {
								...section,
								serial: index,
								blocks: {
									deleteMany: {
										NOT: blocks.map(block => ({
											id: block.id
										}))
									},
									upsert: blocks.map(({ id, sectionId, ...block }, index) => ({
										where: { id },
										create: { ...block, serial: index },
										update: { ...block, serial: index }
									}))
								}
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
}
