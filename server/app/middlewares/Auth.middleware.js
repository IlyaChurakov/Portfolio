import ApiError from '../errors/api.error.js'

export default (req, _, next) => {
	if (!req.user) return next(ApiError.UnauthorizedError())

	return next()
}
