export interface UserResponse {
	id: number
	activationLink: string
	createdAt: string
	isActivated: boolean
	email: string
	name: string
	roles: string[]
	updatedAt: string
	password: string
}
