import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { Forbidden, Unauthorized } from '../utils/Errors.js'

dotenv.config()

class TokenService {
	static generateAccessToken(payload) {
		return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
			expiresIn: '30m'
		})
	}

	static generateRefreshToken(payload) {
		return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
			expiresIn: '15d'
		})
	}

	static verifyAccessToken(accessToken) {
		return jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET)
	}

	static verifyRefreshToken(refreshToken) {
		return jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
	}

	static checkAccess(req, _, next) {
		const authHeader = req.headers.authorization
		const token = authHeader?.split(' ')?.[1]

		if (!token) {
			return next(new Unauthorized())
		}

		try {
			req.user = TokenService.verifyAccessToken(token)
			console.log(req.user)
		} catch (error) {
			console.log(error)
			return next(new Forbidden(error))
		}

		next()
	}
}

export default TokenService
