import { prisma } from '../utils/prisma.js'

class UserRepository {
	static async createUser({ name, email, hashedPassword }) {
		return await prisma.user.create({
			data: {
				name,
				email: email,
				password: hashedPassword
			}
		})
	}

	static async getUserData(email) {
		return await prisma.user.findUnique({
			where: {
				email
			}
		})
	}
}

export default UserRepository
