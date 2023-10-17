import ApiError from '../errors/api.error.js'
import AuthService from '../services/Auth.service.js'

export default (req, res, next) => {
	try {
		const authorizationHeader = req.headers.authorization
		if (!authorizationHeader) {
			return next(ApiError.UnauthorizedError())
		}

		const accessToken = authorizationHeader.split(' ')[1]
		if (!accessToken) {
			return next(ApiError.UnauthorizedError())
		}

		const userData = AuthService.validateAccessToken(accessToken)
		if (!userData) {
			return next(ApiError.UnauthorizedError())
		}

		req.user = userData
		next()
	} catch (err) {
		console.log(err)
		return next(ApiError.UnauthorizedError())
	}
}
