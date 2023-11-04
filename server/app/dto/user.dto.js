export class UserDto {
	name
	email
	id
	isActivated
	roles
	createdAt
	updatedAt
	avatar
	description

	constructor(model) {
		this.name = model.name
		this.email = model.email
		this.id = model.id
		this.isActivated = model.isActivated
		this.roles = model.roles
		this.createdAt = model.createdAt
		this.updatedAt = model.updatedAt
		this.avatar = model.avatar
		this.description = model.description
	}
}
