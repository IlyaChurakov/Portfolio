import * as yup from 'yup'
import UserService from '../services/User.service.js'

const registrationSchema = yup.object().shape({
	name: yup.string().required(),
	email: yup.string().required(),
	password: yup.string().required()
})

class UserController {
	async registration(req, res, next) {
		try {
			await registrationSchema.validate(req.body)

			const { name, email, password } = req.body
			// const userData = await UserService.registration(name, email, password)

			// res.cookie('refreshToken', userData.refreshToken, {
			// 	maxAge: 30 * 24 * 60 * 60 * 1000,
			// 	httpOnly: true
			// })
			res.json(userData)
		} catch (err) {
			next(err)
		}
	}
	async login(req, res, next) {
		try {
			const { email, password } = req.body
			const userData = await UserService.login(email, password)

			res.cookie('refreshToken', userData.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true
			})
			res.json(userData)
		} catch (err) {
			next(err)
		}
	}
	async logout(req, res, next) {
		try {
			const { refreshToken } = req.cookies
			const token = await UserService.logout(refreshToken)

			res.clearCookie('refreshToken')
			return res.json(token)
		} catch (err) {
			next(err)
		}
	}
	async activate(req, res, next) {
		try {
			const activateLink = req.params.link

			await UserService.activate(activateLink)

			return res.redirect(process.env.CLIENT_URL)
		} catch (err) {
			next(err)
		}
	}
	async refresh(req, res, next) {
		try {
			const { refreshToken } = req.cookies

			const userData = await UserService.refresh(refreshToken)

			res.cookie('refreshToken', userData.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true
			})
			res.json(userData)
		} catch (err) {
			next(err)
		}
	}
	async getAllUsers(req, res, next) {
		try {
			const users = await UserService.getAllUsers()
			return res.json(users)
		} catch (err) {
			next(err)
		}
	}
}

export default new UserController()
