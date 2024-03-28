import AuthService from '../services/Auth.service.js'

export default (req, res, next) => {
	let authorizationHeader = req.headers.authorization
	let accessToken
	let userData

	if (authorizationHeader) {
		accessToken = authorizationHeader.split(' ')[1]

		if (accessToken) {
			userData = AuthService.validateAccessToken(accessToken)
		}
	}

	req.user = userData
	next()
}
