import { hash } from 'argon2'
import { v4 as uuidv4 } from 'uuid'
import ApiError from '../errors/api.error.js'
import UserRepository from '../repository/User.repository.js'
import MailService from './Mail.service.js'

class UserService {
	async activate(activationLink) {
		const user = await UserRepository.getOne({ activationLink })

		if (!user) throw ApiError.BadRequest('Неверная ссылка активации')

		await UserRepository.update({ id: user[0].id }, { isActivated: true })
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

	async changeUserRole(id, role) {
		return UserRepository.update({ id }, { role })
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
