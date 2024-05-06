import { prisma } from '../utils/prisma.js'

class RefreshSessionRepository {
	static async getRefreshSession(refreshToken) {
		return await prisma.refreshSession.findFirst({
			where: {
				refreshToken
			}
		})
	}

	static async createRefreshSession({ userId, refreshToken, fingerprint }) {
		await prisma.refreshSession.create({
			data: {
				userId,
				refreshToken,
				fingerPrint: fingerprint.hash
			}
		})
	}

	static async deleteRefreshSession(refreshToken) {
		await prisma.refreshSession.deleteMany({
			where: {
				refreshToken
			}
		})
	}
}

export default RefreshSessionRepository
