import { makeAutoObservable } from 'mobx'
import $axios from '../http'
import { IUser } from '../models/IUser'
import { AuthResponse } from '../models/response/AuthResponse'
import { UserResponse } from '../models/response/UsersResponse'
import AuthService from '../services/Auth.service'
import UserService from '../services/User.service'

export default class UserStore {
	user = {} as IUser
	isAuth = false
	isLoading = false
	userList = [] as UserResponse[]

	constructor() {
		makeAutoObservable(this)
	}

	setAuth(bool: boolean) {
		this.isAuth = bool
	}
	setUser(user: IUser) {
		this.user = user
	}
	setLoading(bool: boolean) {
		this.isLoading = bool
	}
	setUserList(userList: UserResponse[]) {
		this.userList = userList
	}
	async login(email: string, password: string) {
		try {
			const response = await AuthService.login(email, password)
			localStorage.setItem('token', response.data.accessToken)
			console.log(response.data.user)
			this.setAuth(true)
			this.setUser(response.data.user)
		} catch (err) {
			throw new Error(err.response?.data?.message)
		}
	}
	async register(email: string, password: string, name: string) {
		try {
			const response = await AuthService.register(email, password, name)
			localStorage.setItem('token', response.data.accessToken)
			this.setAuth(true)
			this.setUser(response.data.user)
		} catch (err) {
			throw new Error((err as Error).message)
		}
	}
	async logout() {
		try {
			await AuthService.logout()
			localStorage.removeItem('token')
			this.setAuth(false)
			this.setUser({} as IUser)
		} catch (err) {
			throw new Error((err as Error).message)
		}
	}
	async checkAuth() {
		this.setLoading(true)

		try {
			const response = await $axios.get<AuthResponse>(
				`${import.meta.env.VITE_API_URL}/auth/refresh`,
				{ withCredentials: true }
			)

			localStorage.setItem('token', response.data.accessToken)
			this.setAuth(true)
			this.setUser(response.data.user)
		} catch (err) {
			console.log(err.response?.data?.message)
		} finally {
			this.setLoading(false)
		}
	}

	async getUserList() {
		try {
			const { data } = await UserService.getUsersList()
			this.setUserList(data)
		} catch (err) {
			console.log(err)
		}
	}
	async deleteAccount(id?: number) {
		try {
			await UserService.deleteAccount(id || +this.user.id)
			if (id === +this.user.id) {
				await this.logout()
			} else {
				await this.getUserList()
			}
		} catch (err) {
			console.log(err)
		}
	}
	async addRoleById(id: number, role: string) {
		try {
			await UserService.addRole(id, role)
			await this.getUserList()
		} catch (err) {
			console.log(err)
		}
	}
	async removeRoleById(id: number, role: string) {
		try {
			await UserService.deleteRole(id, role)
			await this.getUserList()
		} catch (err) {
			console.log(err)
		}
	}
}
