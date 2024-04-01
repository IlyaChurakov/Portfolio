import { prisma } from '../utils/prisma.js'

export default {
	getOne: async ({ ...data }) =>
		await prisma.user.findUnique({
			where: {
				...data
			}
		}),
	getMany: async ({ ...where }, { ...orderBy }) =>
		await prisma.user.findMany({
			where: {
				...where
			},
			orderBy: {
				...orderBy
			}
		}),
	create: async ({ ...data }) =>
		await prisma.user.create({
			data: {
				...data
			}
		}),
	update: async ({ ...where }, { ...data }) =>
		await prisma.user.update({
			where: {
				...where
			},
			data: {
				...data
			}
		}),
	delete: async ({ ...data }) =>
		await prisma.user.delete({
			where: {
				...data
			}
		})
}
