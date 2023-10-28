import { makeAutoObservable } from 'mobx'
import $axios from '../http'
import { IUser } from '../models/IUser'
import { AuthResponse } from '../models/response/AuthResponse'
import AuthService from '../services/Auth.service'

export default class UserStore {
	user = {} as IUser
	isAuth = false
	isLoading = false

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
	async login(email: string, password: string) {
		try {
			const response = await AuthService.login(email, password)
			localStorage.setItem('token', response.data.accessToken)
			console.log(response.data.user)
			this.setAuth(true)
			this.setUser(response.data.user)
		} catch (err) {
			console.log(err.response?.data?.message)
		}
	}
	async register(email: string, password: string, name: string) {
		try {
			const response = await AuthService.register(email, password, name)
			localStorage.setItem('token', response.data.accessToken)
			this.setAuth(true)
			this.setUser(response.data.user)
		} catch (err) {
			console.log(err.response?.data?.message)
		}
	}
	async logout() {
		try {
			await AuthService.logout()
			localStorage.removeItem('token')
			this.setAuth(false)
			this.setUser({} as IUser)
		} catch (err) {
			console.log(err.response?.data?.message)
		}
	}
	async deleteAccount() {
		try {
			await AuthService.deleteAccount(+this.user.id)
			await this.logout()
		} catch (err) {
			console.log(err)
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
}
