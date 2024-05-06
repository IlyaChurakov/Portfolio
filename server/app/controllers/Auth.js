import { COOKIE_SETTINGS } from '../constants.js'
import AuthService from '../services/Auth.js'
import ErrorsUtils from '../utils/Errors.js'

class AuthController {
	static async signIn(req, res) {
		const { email, password } = req.body
		const { fingerprint } = req

		try {
			const { accessToken, refreshToken, accessTokenExpiration, user } =
				await AuthService.signIn({
					email,
					password,
					fingerprint
				})

			res.cookie('refreshToken', refreshToken, COOKIE_SETTINGS.REFRESH_TOKEN)

			return res.status(200).json({ accessToken, accessTokenExpiration, user })
		} catch (err) {
			return ErrorsUtils.catchError(res, err)
		}
	}

	static async signUp(req, res) {
		const { email, password, name } = req.body
		const { fingerprint } = req

		try {
			const { accessToken, refreshToken, accessTokenExpiration, user } =
				await AuthService.signUp({
					email,
					password,
					name,
					fingerprint
				})

			res.cookie('refreshToken', refreshToken, COOKIE_SETTINGS.REFRESH_TOKEN)

			return res.status(200).json({ accessToken, accessTokenExpiration, user })
		} catch (err) {
			return ErrorsUtils.catchError(res, err)
		}
	}

	static async logOut(req, res) {
		const refreshToken = req.cookies.refreshToken
		try {
			await AuthService.logOut(refreshToken)

			res.clearCookie('refreshToken')

			return res.sendStatus(200)
		} catch (err) {
			return ErrorsUtils.catchError(res, err)
		}
	}

	static async refresh(req, res) {
		const { fingerprint } = req
		const currentRefreshToken = req.cookies.refreshToken

		try {
			const { accessToken, refreshToken, accessTokenExpiration, user } =
				await AuthService.refresh({
					currentRefreshToken,
					fingerprint
				})

			res.cookie('refreshToken', refreshToken, COOKIE_SETTINGS.REFRESH_TOKEN)

			return res.status(200).json({ accessToken, accessTokenExpiration, user })
		} catch (err) {
			return ErrorsUtils.catchError(res, err)
		}
	}
}

export default AuthController
