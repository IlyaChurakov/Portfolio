import { IUser } from '../user.types'

export interface AuthResponse {
	accessToken: string
	refreshToken: string
	user: IUser
	message?: string
}
