export interface IUser {
	id: string
	updatedAt: Date
	createdAt: Date

	role: number
	email: string

	name: string
	isActivated: boolean
	avatar: string | null
	description: string
}

export interface AuthResponse {
	accessToken: string
	accessTokenExpiration: number
	user: IUser
	error?: string
}
