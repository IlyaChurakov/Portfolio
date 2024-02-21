import { AxiosError } from 'axios'
import { makeAutoObservable } from 'mobx'
import UserService from '../../../../services/User.service'
import { IUser } from '../authStore/types/auth.types'
import { RootStore } from '../rootStore'

export class UserStore {
	private rootStore: RootStore

	userList: IUser[]
	error: AxiosError | undefined

	constructor(rootStore: RootStore) {
		makeAutoObservable(this)

		this.rootStore = rootStore

		this.userList = []
	}

	setError(err: AxiosError) {
		this.error = err
	}

	getUserList = async () => {
		try {
			const users = await UserService.getUsersList()
			this.userList = users
		} catch (err) {
			this.setError(err as AxiosError)
		}
	}

	deleteAccount = async (id: string) => {
		try {
			const deletedUser = await UserService.deleteAccount(id)

			if (id === this.rootStore.authStore.user.id) {
				await this.rootStore.authStore.logout()
			} else {
				const indexOfDeletedUser = this.userList.findIndex(
					user => user.id === deletedUser.id
				)
				if (indexOfDeletedUser !== -1)
					this.userList.splice(indexOfDeletedUser, 1)
			}
		} catch (err) {
			this.setError(err as AxiosError)
		}
	}

	async addRoleById(id: string, role: string) {
		try {
			await UserService.addRole(id, role)
			await this.getUserList()
		} catch (err) {
			throw new Error((err as Error).message)
		}
	}
	removeRoleById = async (id: string, role: string) => {
		try {
			await UserService.deleteRole(id, role)
			await this.getUserList()
		} catch (err) {
			throw new Error((err as Error).message)
		}
	}
	assignAvatar = async (id: string, avatar: string) => {
		try {
			const { data } = await UserService.assignAvatar(id, avatar)
			this.rootStore.authStore.setUser(data)
		} catch (err) {
			throw new Error((err as Error).message)
		}
	}
	changeDescription = async (id: string, description: string) => {
		try {
			const { data } = await UserService.changeDescription(id, description)
			this.rootStore.authStore.setUser(data)
		} catch (err) {
			throw new Error((err as Error).message)
		}
	}
}
