import { hash, verify } from 'argon2'
import { ACCESS_TOKEN_EXPIRATION } from '../constants.js'
import RefreshSessionRepository from '../repository/RefreshSession.js'
import UserRepository from '../repository/User.js'
import { Conflict, Forbidden, NotFound, Unauthorized } from '../utils/Errors.js'
import TokenService from './Token.js'

const salt = 8

class AuthService {
	static async signIn({ email, password, fingerprint }) {
		const userData = await UserRepository.getUserData(email)

		if (!userData) {
			throw new NotFound('Пользователь не найден')
		}

		const isPasswordValid = await verify(userData.password, password)

		if (!isPasswordValid) {
			throw new Forbidden('Неверное имя или пароль')
		}

		const payload = {
			id: userData.id,
			role: userData.role,
			email: userData.email
		}

		const accessToken = TokenService.generateAccessToken(payload)
		const refreshToken = TokenService.generateRefreshToken(payload)

		await RefreshSessionRepository.createRefreshSession({
			userId: userData.id,
			refreshToken,
			fingerprint
		})

		return {
			accessToken,
			refreshToken,
			accessTokenExpiration: ACCESS_TOKEN_EXPIRATION,
			user: userData
		}
	}

	static async signUp({ name, email, password, fingerprint }) {
		const userData = await UserRepository.getUserData(email)

		if (userData) {
			throw new Conflict('Пользователь с таким email уже существует')
		}

		const hashedPassword = await hash(password, salt)
		const { id, role } = await UserRepository.createUser({
			email,
			hashedPassword,
			name
		})

		const payload = { id, email, role }

		const accessToken = TokenService.generateAccessToken(payload)
		const refreshToken = TokenService.generateRefreshToken(payload)

		await RefreshSessionRepository.createRefreshSession({
			userId: id,
			refreshToken,
			fingerprint
		})

		return {
			accessToken,
			refreshToken,
			accessTokenExpiration: ACCESS_TOKEN_EXPIRATION,
			user: userData
		}
	}

	static async logOut(refreshToken) {
		await RefreshSessionRepository.deleteRefreshSession(refreshToken)
	}

	static async refresh({ fingerprint, currentRefreshToken }) {
		if (!currentRefreshToken) {
			throw new Unauthorized()
		}

		const refreshSession = await RefreshSessionRepository.getRefreshSession(
			currentRefreshToken
		)

		if (!refreshSession) {
			throw new Unauthorized()
		}

		if (refreshSession.fingerPrint !== fingerprint.hash) {
			console.log('Попытка несанкционированного обновления токенов')
			throw new Forbidden()
		}

		await RefreshSessionRepository.deleteRefreshSession(currentRefreshToken)

		let payload
		try {
			payload = TokenService.verifyRefreshToken(currentRefreshToken)
		} catch (error) {
			throw new Forbidden(error)
		}

		const userData = await UserRepository.getUserData(payload.email)

		const actualPayload = {
			id: userData.id,
			email: userData.email,
			role: userData.role
		}

		const accessToken = TokenService.generateAccessToken(actualPayload)
		const refreshToken = TokenService.generateRefreshToken(actualPayload)

		await RefreshSessionRepository.createRefreshSession({
			userId: userData.id,
			refreshToken,
			fingerprint
		})

		return {
			accessToken,
			refreshToken,
			accessTokenExpiration: ACCESS_TOKEN_EXPIRATION,
			user: userData
		}
	}
}

export default AuthService
