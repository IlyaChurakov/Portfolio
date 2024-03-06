import { AxiosError } from 'axios'
import { makeAutoObservable, runInAction } from 'mobx'
import AuthService from '../../../services/Auth.service'
import { RootStore } from '../rootStore'
import { IUser } from './types/auth.types'

export class AuthStore {
	rootStore: RootStore

	isAuth: boolean
	isLoading: boolean
	error?: AxiosError

	constructor(rootStore: RootStore) {
		makeAutoObservable(this)

		this.rootStore = rootStore

		this.isAuth = false
		this.isLoading = false
	}

	setAuth(bool: boolean) {
		this.isAuth = bool
	}
	setUser(user: IUser) {
		this.rootStore.userStore.user = user
	}
	setLoading(bool: boolean) {
		this.isLoading = bool
	}
	setError(err: AxiosError) {
		this.error = err
	}

	async register(email: string, password: string, name: string) {
		try {
			this.setLoading(true)

			const authResponse = await AuthService.register(email, password, name)

			localStorage.setItem('token', authResponse.accessToken)

			runInAction(() => {
				this.setAuth(true)
				this.setUser(authResponse.user)
			})
		} catch (err) {
			this.setError(err as AxiosError)
		} finally {
			this.setLoading(false)
		}
	}

	async login(email: string, password: string) {
		try {
			this.setLoading(true)

			const authResponse = await AuthService.login(email, password)

			localStorage.setItem('token', authResponse.accessToken)

			runInAction(() => {
				this.setAuth(true)
				this.setUser(authResponse.user)
			})
		} catch (err) {
			this.setError(err as AxiosError)
		} finally {
			this.setLoading(false)
		}
	}

	async logout() {
		try {
			this.setLoading(true)

			await AuthService.logout()

			localStorage.removeItem('token')

			runInAction(() => {
				this.setAuth(false)
				this.setUser({} as IUser)
			})
		} catch (err) {
			this.setError(err as AxiosError)
		} finally {
			this.setLoading(false)
		}
	}

	async checkAuth() {
		try {
			this.setLoading(true)

			const authResponse = await AuthService.refresh()

			localStorage.setItem('token', authResponse.accessToken)

			runInAction(() => {
				this.setAuth(true)
				this.setUser(authResponse.user)
			})
		} catch (err) {
			this.setError(err as AxiosError)
		} finally {
			this.setLoading(false)
		}
	}
}
