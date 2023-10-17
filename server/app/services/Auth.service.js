import jwt from 'jsonwebtoken'
import { prisma } from '../utils/prisma.js'

class AuthService {
	generateTokens(payload) {
		const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
			expiresIn: '5m'
		})
		const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
			expiresIn: '8h'
		})

		return { accessToken, refreshToken }
	}

	validateAccessToken(token) {
		try {
			const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)

			return userData
		} catch (err) {
			console.log(err)
			return null
		}
	}

	validateRefreshToken(token) {
		try {
			const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
			return userData
		} catch (err) {
			return null
		}
	}

	async saveToken(userId, refreshToken) {
		const token = await prisma.refreshToken.create({
			data: {
				userId,
				hashedToken: refreshToken
			}
		})
		return token
	}

	async removeToken(refreshToken) {
		const tokenData = await prisma.refreshToken.deleteMany({
			where: {
				hashedToken: refreshToken
			}
		})
		return tokenData
	}

	async findToken(refreshToken) {
		const tokenData = await prisma.refreshToken.findMany({
			where: {
				hashedToken: refreshToken
			}
		})
		return tokenData
	}
}

export default new AuthService()
