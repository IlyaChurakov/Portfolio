export interface IUser {
	id: string
	name: string
	email: string
	isActivated: boolean
	roles: string[]
	updatedAt: Date
	createdAt: Date
	avatar: string | null
	description: string
}

export interface AuthResponse {
	accessToken: string
	refreshToken: string
	user: IUser
	message?: string
}
