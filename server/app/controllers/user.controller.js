import * as yup from 'yup'
import ProjectService from '../services/Project.service.js'
import UserService from '../services/User.service.js'

const registrationSchema = yup.object().shape({
	name: yup.string().required(),
	email: yup.string().required(),
	password: yup.string().required()
})

class UserController {
	async register(req, res, next) {
		try {
			await registrationSchema.validate(req.body)

			const { name, email, password } = req.body

			const userData = await UserService.register(name, email, password)

			const maxAge = 30 * 24 * 60 * 60 * 1000

			res.cookie('refreshToken', userData.refreshToken, {
				maxAge,
				httpOnly: true
			})
			return res.json(userData)
		} catch (err) {
			return next(err)
		}
	}

	async login(req, res, next) {
		try {
			const { email, password } = req.body
			const userData = await UserService.login(email, password)

			const maxAge = 30 * 24 * 60 * 60 * 1000

			res.cookie('refreshToken', userData.refreshToken, {
				maxAge,
				httpOnly: true
			})
			return res.json(userData)
		} catch (err) {
			return next(err)
		}
	}

	async logout(req, res, next) {
		try {
			const { refreshToken } = req.cookies
			const token = await UserService.logout(refreshToken)

			res.clearCookie('refreshToken')
			return res.json(token)
		} catch (err) {
			return next(err)
		}
	}

	async refresh(req, res, next) {
		try {
			const { refreshToken } = req.cookies

			const userData = await UserService.refresh(refreshToken)

			const maxAge = 30 * 24 * 60 * 60 * 1000

			res.cookie('refreshToken', userData.refreshToken, {
				maxAge,
				httpOnly: true
			})
			return res.json(userData)
		} catch (err) {
			return next(err)
		}
	}

	async activate(req, res, next) {
		try {
			const { link } = req.params

			await UserService.activate(link)

			return res.redirect(process.env.CLIENT_URL)
		} catch (err) {
			return next(err)
		}
	}

	async sendResetMail(req, res, next) {
		try {
			const { email } = req.body

			await UserService.sendResetMail(email)

			return res.send()
		} catch (err) {
			return next(err)
		}
	}

	async changePassword(req, res, next) {
		try {
			const { password, link } = req.body

			await UserService.changePassword(password, link)

			return res.send()
		} catch (err) {
			return next(err)
		}
	}

	async addRole(req, res, next) {
		try {
			const { id } = req.params
			const { role } = req.body

			const user = await UserService.addRole(parseInt(id), role)

			return res.json(user)
		} catch (err) {
			return next(err)
		}
	}

	async deleteRole(req, res, next) {
		try {
			const { id } = req.params
			const { role } = req.body

			const user = await UserService.getUser({ id: parseInt(id) })

			const roles = user.roles.filter(r => r !== role)

			const updatedUser = await UserService.updateUser({
				id: parseInt(id),
				roles
			})

			return res.json(updatedUser)
		} catch (err) {
			return next(err)
		}
	}

	async deleteUser(req, res, next) {
		try {
			const { id } = req.params
			const userData = await UserService.deleteUser({ id: parseInt(id) })

			return res.json(userData)
		} catch (err) {
			next(err)
		}
	}

	async getAllUsers(_, res, next) {
		try {
			const users = await UserService.getAllUsers()

			return res.json(users)
		} catch (err) {
			return next(err)
		}
	}

	async updateUser(req, res, next) {
		try {
			const { user } = req.body
			const newAvatar = user.avatar

			const currentUser = await UserService.getUser({ id: user.id })
			const currentAvatar = currentUser.avatar

			if (currentAvatar && newAvatar !== currentAvatar)
				await ProjectService.deleteFiles([currentAvatar])

			const updatedUser = await UserService.updateUser(user)

			return res.json(updatedUser)
		} catch (err) {
			return next(err)
		}
	}
}

export default new UserController()
