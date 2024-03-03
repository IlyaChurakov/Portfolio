import { AxiosError } from 'axios'
import { makeAutoObservable } from 'mobx'
import UserService from '../../../../services/User.service'
import { IUser } from '../authStore/types/auth.types'
import { RootStore } from '../rootStore'

export class UserStore {
	private rootStore: RootStore

	user: IUser
	userList: IUser[]

	constructor(rootStore: RootStore) {
		makeAutoObservable(this)

		this.rootStore = rootStore

		this.user = {} as IUser
		this.userList = []
	}

	setUserList(users: IUser[]) {
		this.userList = users
	}
	setUserDescription(description: string) {
		this.user.description = description
	}
	setUserName(name: string) {
		this.user.name = name
	}
	setUserMail(email: string) {
		this.user.email = email
	}
	setUser(user: IUser) {
		this.user = user
	}

	set activeUser(user: IUser) {
		this.activeUser = user
	}

	getUserList = async () => {
		try {
			const users = await UserService.getUsersList()

			this.setUserList(users)
		} catch (e) {
			throw new Error((e as AxiosError).message)
		}
	}

	deleteAccount = async (id: string) => {
		try {
			const deletedUser = await UserService.deleteAccount(id)

			if (id === this.user.id) {
				await this.rootStore.authStore.logout()
			} else {
				const indexOfDeletedUser = this.userList.findIndex(
					user => user.id === deletedUser.id
				)
				if (indexOfDeletedUser !== -1)
					this.userList.splice(indexOfDeletedUser, 1)
			}
		} catch (e) {
			throw new Error((e as AxiosError).message)
		}
	}

	async addRoleById(id: string, role: string) {
		try {
			const updatedUser = await UserService.addRole(id, role)

			const user = this.userList.find(us => us.id === updatedUser.id)
			if (user) user.roles = updatedUser.roles
		} catch (e) {
			throw new Error((e as AxiosError).message)
		}
	}

	async removeRoleById(id: string, role: string) {
		try {
			const updatedUser = await UserService.deleteRole(id, role)

			const user = this.userList.find(us => us.id === updatedUser.id)
			if (user) user.roles = updatedUser.roles
		} catch (e) {
			throw new Error((e as AxiosError).message)
		}
	}

	async update(user: IUser) {
		try {
			const updatedUser = await UserService.update(user)

			this.setUser(updatedUser)
		} catch (e) {
			throw new Error((e as AxiosError).message)
		}
	}
}
