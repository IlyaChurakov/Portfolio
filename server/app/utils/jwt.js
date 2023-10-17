import jwt from 'jsonwebtoken'

export function generateAccessToken(payload) {
	return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
		expiresIn: '5m'
	})
}

export function generateRefreshToken(payload) {
	return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
		expiresIn: '8h'
	})
}

export function generateTokens(payload) {
	const accessToken = generateAccessToken(payload)
	const refreshToken = generateRefreshToken(payload)

	return {
		accessToken,
		refreshToken
	}
}
