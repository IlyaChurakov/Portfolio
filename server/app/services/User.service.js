import { hash, verify } from 'argon2'
import { v4 as uuidv4 } from 'uuid'
import { prisma } from '../prisma.js'

class UserService {
	async registration(name, email, password) {
		const candidate = await prisma.user.findUnique({
			where: {
				email
			}
		})

		if (candidate) throw new Error(`User with email ${email} already exists`)

		const user = await prisma.user.create({
			data: {
				name,
				email,
				password: await hash(password),
				activationLink: uuidv4()
			}
		})

		return user

		// await MailService.sendActivationMail(
		// 	email,
		// 	`${process.env.API_URL}/api/activate/${activationLink}`
		// )

		// const userDto = new UserDto(user)
		// const tokens = TokenService.generateTokens({ ...userDto })

		// await TokenService.saveToken(userDto.id, tokens.refreshToken)

		// return {
		// 	...tokens,
		// 	user: userDto
		// }
	}

	async activate(activationLink) {
		const user = await UserModel.findOne({ activationLink })

		if (!user) throw ApiError.BadRequest('Invalid activation link')

		user.isActivated = true
		await user.save()
	}

	async login(email, password) {
		const user = await prisma.user.findUnique({
			where: {
				email
			}
		})
		if (!user) throw new Error('User not found')

		const isPassEquals = await verify(user.password, password)
		if (!isPassEquals) throw new Error('Invalid password')

		// const userDto = new UserDto(user)
		// const tokens = TokenService.generateTokens({ ...userDto })

		// await TokenService.saveToken(userDto.id, tokens.refreshToken)

		return user
	}

	async logout(refreshToken) {
		const token = await TokenService.removeToken(refreshToken)
		return token
	}

	async refresh(refreshToken) {
		if (!refreshToken) {
			throw ApiError.UnauthorizedError()
		}
		const userData = TokenService.validateRefreshToken(refreshToken)
		const tokenFromDb = await TokenService.findToken(refreshToken)

		if (!userData || !tokenFromDb) {
			throw ApiError.UnauthorizedError()
		}

		const user = await UserModel.findById(userData.id)
		const userDto = new UserDto(user)
		const tokens = TokenService.generateTokens({ ...userDto })

		await TokenService.saveToken(userDto.id, tokens.refreshToken)

		return {
			...tokens,
			user: userDto
		}
	}

	async getAllUsers() {
		const users = await prisma.user.findMany()
		return users
	}
}

export default new UserService()
