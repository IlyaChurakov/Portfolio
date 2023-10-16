import jwt from 'jsonwebtoken'
import { prisma } from '../utils/prisma.js'

class TokenService {
	generateTokens(payload) {
		const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
			expiresIn: '20s'
		})
		const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
			expiresIn: '30d'
		})

		return { accessToken, refreshToken }
	}

	validateAccessToken(token) {
		try {
			const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
			return userData
		} catch (err) {
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

	async addRefreshTokenToWhitelist({ userId, refreshToken }) {
		console.log('WWWWWWWWWWWW')
		const token = await prisma.refreshToken.create({
			data: {
				userId,
				refreshToken
			}
		})
		console.log('RRRRRRRRRRRRRRR')
		return token
	}

	async removeToken(refreshToken) {
		const tokenData = await TokenModel.deleteOne({ refreshToken })
		return tokenData
	}

	async findToken(refreshToken) {
		const tokenData = await TokenModel.findOne({ refreshToken })
		return tokenData
	}
}

export default new TokenService()
