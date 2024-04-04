import { hash, verify } from 'argon2'
import { v4 as uuidv4 } from 'uuid'
import { UserDto } from '../dto/user.dto.js'
import ApiError from '../errors/api.error.js'
import UserRepository from '../repository/User.repository.js'
import AuthService from './Auth.service.js'
import MailService from './Mail.service.js'

class UserService {
	async register(name, email, password) {
		const candidate = await UserRepository.getOne({ email })
		if (candidate)
			throw ApiError.BadRequest(`Пользователь ${email} уже существует`)

		const activationLink = uuidv4()

		const link = `${process.env.API_URL}/api/user/activate/${activationLink}`

		await MailService.sendActivationMail(email, link)

		const user = await UserRepository.create({
			name,
			email,
			password: await hash(password),
			activationLink
		})

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

	async login(email, password) {
		const user = await UserRepository.getOne({ email })
		if (!user) throw ApiError.BadRequest('Пользователь не найден')

		const isPassEquals = await verify(user.password, password)
		if (!isPassEquals) throw ApiError.UnauthorizedError('Неверный пароль')

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
		const user = await UserRepository.getOne({ activationLink })

		if (!user) throw ApiError.BadRequest('Неверная ссылка активации')

		await UserRepository.update({ id: user[0].id }, { isActivated: true })
	}

	async logout(refreshToken) {
		return await AuthService.removeToken(refreshToken)
	}

	async refresh(refreshToken) {
		if (!refreshToken) throw ApiError.UnauthorizedError()

		const userData = AuthService.validateRefreshToken(refreshToken)
		const tokenFromDb = await AuthService.findToken(refreshToken)

		if (!userData || !tokenFromDb) throw ApiError.UnauthorizedError()

		const user = await UserRepository.getOne({
			id: userData.id
		})

		const userDto = new UserDto(user)
		const tokens = AuthService.generateTokens({ ...userDto })

		await AuthService.saveToken(userDto.id, tokens.refreshToken)

		return {
			...tokens,
			user: userDto
		}
	}

	async sendResetMail(email) {
		const candidate = await UserRepository.getOne({ email })

		if (!candidate)
			throw ApiError.BadRequest(`Пользователь ${email} не существует`)

		const user = await UserRepository.update(
			{ email },
			{ restoreLink: uuidv4() }
		)

		await MailService.sendResetMail(
			email,
			`${process.env.CLIENT_URL}/restore-access/${user.restoreLink}`
		)
	}

	async changePassword(password, link) {
		await UserRepository.update(
			{ restoreLink: link },
			{ password: await hash(password), restoreLink: null }
		)
	}

	async addRole(id, role) {
		return UserRepository.update({ id }, { roles: { push: role } })
	}

	async getUser(user) {
		const findedUser = await UserRepository.getOne({ ...user })
		if (!findedUser) throw ApiError.BadRequest('Пользователь не найден')

		return findedUser
	}

	async getAllUsers() {
		return await UserRepository.getMany(
			{},
			{
				id: 'desc'
			}
		)
	}

	async deleteUser(user) {
		return await UserRepository.delete({ ...user })
	}

	async updateUser({ id, ...data }) {
		return await UserRepository.update({ id }, { ...data })
	}
}

export default new UserService()
