import ApiError from '../errors/api.error.js'

export default (req, _, next) => {
	try {
		if (!req.user) return next(ApiError.UnauthorizedError())
		return next()
	} catch (err) {
		return next(ApiError.UnauthorizedError())
	}
}
