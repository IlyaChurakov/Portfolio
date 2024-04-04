import ApiError from '../errors/api.error.js'

export default (err, _, res, next) => {
	if (err instanceof ApiError) {
		return res
			.status(err.status)
			.json({ message: err.message, errors: err.errors })
	}
	next(err)
}
