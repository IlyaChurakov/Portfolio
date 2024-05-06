import { AxiosError } from 'axios'
import { makeAutoObservable, runInAction } from 'mobx'
import AuthService from '../../../services/Auth.service'
import { RootStore } from '../rootStore'
import { AuthResponse, IUser } from './auth.types'

export class AuthStore {
	rootStore: RootStore

	isAppReady: boolean
	isUserLogged: boolean

	constructor(rootStore: RootStore) {
		makeAutoObservable(this)

		this.rootStore = rootStore

		this.isAppReady = false
		this.isUserLogged = false
	}

	setIsAppReady(bool: boolean) {
		this.isAppReady = bool
	}
	setIsUserLogged(bool: boolean) {
		this.isUserLogged = bool
	}

	setUser(user: IUser) {
		this.rootStore.userStore.user = user
	}

	async register(email: string, password: string, name: string) {
		try {
			const authResponse = await AuthService.register(email, password, name)

			localStorage.setItem('token', authResponse.accessToken)

			runInAction(() => {
				this.setUser(authResponse.user)
				this.setIsUserLogged(true)
			})
		} catch (err) {
			const error = err as AxiosError<AuthResponse>
			if (error.response?.data.error)
				this.rootStore.errorStore.add(error.response?.data.error)
		} finally {
			this.setIsAppReady(true)
		}
	}

	async login(email: string, password: string) {
		try {
			const authResponse = await AuthService.login(email, password)

			localStorage.setItem('token', authResponse.accessToken)

			runInAction(() => {
				this.setIsUserLogged(true)
				this.setUser(authResponse.user)
			})
		} catch (err) {
			const error = err as AxiosError<AuthResponse>
			if (error.response?.data.error)
				this.rootStore.errorStore.add(error.response?.data.error)
		} finally {
			this.setIsAppReady(true)
		}
	}

	async logout() {
		try {
			await AuthService.logout()

			localStorage.removeItem('token')

			runInAction(() => {
				this.setIsUserLogged(false)
				this.setUser({} as IUser)
			})
		} catch (err) {
			const error = err as AxiosError<AuthResponse>
			if (error.response?.data.error)
				this.rootStore.errorStore.add(error.response?.data.error)
		} finally {
			this.setIsAppReady(true)
		}
	}

	async checkAuth() {
		try {
			const authResponse = await AuthService.refresh()

			localStorage.setItem('token', authResponse.accessToken)

			runInAction(() => {
				this.setIsUserLogged(true)
				this.setUser(authResponse.user)
			})
		} catch (err) {
			this.setIsUserLogged(false)
			const error = err as AxiosError<AuthResponse>
			if (error.response?.data.error)
				this.rootStore.errorStore.add(error.response?.data.error)
		} finally {
			this.setIsAppReady(true)
		}
	}

	// TODO: вынести запросы из стора

	async requestRestoreAccess(email: string) {
		try {
			await AuthService.requestRestoreAccess(email)
		} catch (err) {
			const error = err as AxiosError<AuthResponse>
			if (error.response?.data.error)
				this.rootStore.errorStore.add(error.response?.data.error)
		}
	}

	async changePassword(password: string, link: string) {
		try {
			await AuthService.changePassword(password, link)
		} catch (err) {
			const error = err as AxiosError<AuthResponse>
			if (error.response?.data.error)
				this.rootStore.errorStore.add(error.response?.data.error)
		}
	}
}
