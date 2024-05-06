import TokenService from '../services/Token.js'

export default (req, res, next) => {
	let authorizationHeader = req.headers.authorization
	let accessToken
	let userData

	if (authorizationHeader) {
		accessToken = authorizationHeader.split(' ')[1]

		if (accessToken) {
			try {
				userData = TokenService.verifyAccessToken(accessToken)
			} catch (e) {}
		}
	}

	req.user = userData
	next()
}
