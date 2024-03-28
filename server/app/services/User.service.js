import { hash, verify } from 'argon2'
import { v4 as uuidv4 } from 'uuid'
import { UserDto } from '../dto/user.dto.js'
import ApiError from '../errors/api.error.js'
import { prisma } from '../utils/prisma.js'
import AuthService from './Auth.service.js'
import MailService from './Mail.service.js'

class UserService {
	async register(name, email, password) {
		const candidate = await prisma.user.findUnique({
			where: {
				email
			}
		})

		if (candidate)
			throw ApiError.BadRequest(`User with email ${email} already exists`)

		const user = await prisma.user.create({
			data: {
				name,
				email,
				password: await hash(password),
				activationLink: uuidv4()
			}
		})

		await MailService.sendActivationMail(
			email,
			`${process.env.API_URL}/api/user/activate/${user.activationLink}`
		)

		const userDto = new UserDto(user)
		const { accessToken, refreshToken } = AuthService.generateTokens({
			...userDto
		})

		await AuthService.saveToken(userDto.id, refreshToken)

		return {
			accessToken,
			refreshToken,
			user: userDto
		}
	}

	async activate(activationLink) {
		const user = await prisma.user.findUnique({
			where: {
				activationLink
			}
		})

		if (!user) throw ApiError.BadRequest('Invalid activation link')

		await prisma.user.update({
			where: {
				id: user[0].id
			},
			data: {
				isActivated: true
			}
		})
	}

	async login(email, password) {
		const user = await prisma.user.findUnique({
			where: {
				email
			}
		})
		if (!user) throw ApiError.NotFound('User not found')

		const isPassEquals = await verify(user.password, password)
		if (!isPassEquals) throw ApiError.UnauthorizedError('Invalid password')

		const userDto = new UserDto(user)
		const { accessToken, refreshToken } = AuthService.generateTokens({
			...userDto
		})

		// await AuthService.removeUserTokens(userDto.id)
		await AuthService.saveToken(userDto.id, refreshToken)

		return {
			accessToken,
			refreshToken,
			user: userDto
		}
	}

	async logout(refreshToken) {
		const token = await AuthService.removeToken(refreshToken)
		return token
	}

	async refresh(refreshToken) {
		if (!refreshToken) {
			throw ApiError.UnauthorizedError()
		}
		const userData = AuthService.validateRefreshToken(refreshToken)
		const tokenFromDb = await AuthService.findToken(refreshToken)

		if (!userData || !tokenFromDb) {
			throw ApiError.UnauthorizedError()
		}

		const user = await prisma.user.findUnique({
			where: {
				id: userData.id
			}
		})
		const userDto = new UserDto(user)
		const tokens = AuthService.generateTokens({ ...userDto })

		// await AuthService.removeUserTokens(userDto.id)
		await AuthService.saveToken(userDto.id, tokens.refreshToken)

		return {
			...tokens,
			user: userDto
		}
	}

	async requestRestoreAccess(email) {
		const candidate = await prisma.user.findUnique({
			where: {
				email
			}
		})

		if (!candidate)
			throw ApiError.BadRequest(`User with email ${email} does not exist`)

		const user = await prisma.user.update({
			where: { email },
			data: {
				restoreLink: uuidv4()
			}
		})

		await MailService.sendRestoringAccessMail(
			email,
			`${process.env.CLIENT_URL}/restore-access/${user.restoreLink}`
		)
	}

	async changePassword(password, link) {
		await prisma.user.update({
			where: {
				restoreLink: link
			},
			data: {
				password: await hash(password),
				restoreLink: null
			}
		})
	}

	async getAllUsers() {
		const users = await prisma.user.findMany({
			orderBy: {
				id: 'desc'
			}
		})
		return users
	}

	async getUserById(id) {
		return await prisma.user.findUnique({
			where: {
				id
			}
		})
	}

	async deleteUserById(id) {
		return await prisma.user.delete({
			where: {
				id
			}
		})
	}

	async addRole(id, role) {
		return await prisma.user.update({
			where: {
				id
			},
			data: {
				roles: {
					push: role
				}
			}
		})
	}

	async deleteRole(id, role) {
		const user = await prisma.user.findUnique({
			where: {
				id
			}
		})

		if (!user) throw ApiError.BadRequest('User not found')
		return await prisma.user.update({
			where: {
				id
			},
			data: {
				roles: { set: user.roles.filter(r => r !== role) }
			}
		})
	}

	async updateUser({ id, ...otherUserFields }) {
		return await prisma.user.update({
			where: {
				id
			},
			data: {
				...otherUserFields
			}
		})
	}
}

export default new UserService()
