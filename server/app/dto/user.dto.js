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
		this.id = model.id
		this.email = model.email
		this.name = model.name

		this.isActivated = model.isActivated
		this.roles = model.roles
		this.avatar = model.avatar
		this.description = model.description

		this.createdAt = model.createdAt
		this.updatedAt = model.updatedAt
	}
}
