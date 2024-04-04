export default class ApiError extends Error {
	status
	errors

	constructor(status, message, errors = []) {
		super(message)

		this.status = status
		this.errors = errors
	}

	static BadRequest(message, errors = []) {
		return new ApiError(400, message, errors)
	}

	static UnauthorizedError() {
		return new ApiError(401, 'Не авторизован')
	}

	static NotFound(message, errors = []) {
		return new ApiError(404, message, errors)
	}

	static ServerError(message, errors = []) {
		return new ApiError(500, message, errors)
	}
}
