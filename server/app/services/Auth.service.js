import jwt from 'jsonwebtoken'
import { prisma } from '../utils/prisma.js'

class AuthService {
	generateTokens(payload) {
		const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
			expiresIn: '30m'
		})
		const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
			expiresIn: '24h'
		})

		return { accessToken, refreshToken }
	}

	validateAccessToken(token) {
		try {
			return jwt.verify(token, process.env.JWT_ACCESS_SECRET)
		} catch (err) {
			return null
		}
	}

	validateRefreshToken(token) {
		try {
			return jwt.verify(token, process.env.JWT_REFRESH_SECRET)
		} catch (err) {
			return null
		}
	}

	async saveToken(userId, refreshToken) {
		return await prisma.refreshToken.create({
			data: {
				userId,
				hashedToken: refreshToken
			}
		})
	}

	async removeToken(refreshToken) {
		return await prisma.refreshToken.deleteMany({
			where: {
				hashedToken: refreshToken
			}
		})
	}

	async removeUserTokens(userId) {
		return await prisma.refreshToken.deleteMany({
			where: {
				userId
			}
		})
	}

	async findToken(refreshToken) {
		return await prisma.refreshToken.findMany({
			where: {
				hashedToken: refreshToken
			}
		})
	}
}

export default new AuthService()
