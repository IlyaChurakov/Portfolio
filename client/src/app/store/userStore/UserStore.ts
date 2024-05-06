import { AxiosError } from 'axios'
import { makeAutoObservable } from 'mobx'
import UserService from '../../../services/User.service'
import { IUser } from '../authStore/auth.types'
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

	selectUserFields(userFields: Partial<IUser>): Partial<IUser> {
		const partOfUser: { [key: string]: unknown } = {}

		for (const key in userFields) {
			if (this.user.hasOwnProperty(key)) {
				partOfUser[key] = this.user[key as keyof IUser]
			}
		}

		return partOfUser
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

	async changeUserRole(userId: string, role: number) {
		try {
			const updatedUser = await UserService.changeUserRole(userId, role)

			const user = this.userList.find(us => us.id === updatedUser.id)
			if (user) user.role = updatedUser.role
		} catch (e) {
			throw new Error((e as AxiosError).message)
		}
	}

	async updateUser(user: IUser) {
		try {
			const updatedUser = await UserService.updateUser(user)
			this.setUser(updatedUser)
		} catch (e) {
			throw new Error((e as AxiosError).message)
		}
	}
}
