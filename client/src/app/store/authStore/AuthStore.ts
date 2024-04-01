import { AxiosError } from 'axios'
import { makeAutoObservable, runInAction } from 'mobx'
import AuthService from '../../../services/Auth.service'
import { RootStore } from '../rootStore'
import { AuthResponse, IUser } from './types/auth.types'

export class AuthStore {
	rootStore: RootStore

	isAuth: boolean
	isLoading: boolean

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
			const { response } = err as AxiosError<AuthResponse>
			if (!response) return

			const { status } = response

			if (status === 400) {
				this.rootStore.errorStore.add(
					'Пользователь с таким email уже существует!'
				)
			} else if (status === 422) {
				this.rootStore.errorStore.add('Указанный пароль не допустим')
			} else {
				this.rootStore.errorStore.add(`Неизвестная ошибка`)
			}
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
			const { response } = err as AxiosError<AuthResponse>
			if (!response) return

			const { status } = response

			if (status === 400) {
				this.rootStore.errorStore.add('Пользователь не найден')
			} else if (status === 401) {
				this.rootStore.errorStore.add('Неверный пароль')
			} else {
				this.rootStore.errorStore.add(`Неизвестная ошибка`)
			}
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
			const { response } = err as AxiosError<AuthResponse>
			if (!response) return

			const { status } = response

			this.rootStore.errorStore.add(`Неизвестная ошибка: ${status}`)
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
		} finally {
			this.setLoading(false)
		}
	}

	async requestRestoreAccess(email: string) {
		try {
			this.setLoading(true)

			await AuthService.requestRestoreAccess(email)
		} catch (err) {
			const { response } = err as AxiosError<AuthResponse>
			if (!response) return

			const { status } = response

			if (status === 400) {
				this.rootStore.errorStore.add(
					'Пользователь c таким email не существует'
				)
			} else {
				this.rootStore.errorStore.add(`Неизвестная ошибка`)
			}
		} finally {
			this.setLoading(false)
		}
	}

	async changePassword(password: string, link: string) {
		try {
			this.setLoading(true)

			await AuthService.changePassword(password, link)
		} catch (err) {
			const { response } = err as AxiosError<AuthResponse>
			if (!response) return

			const { status } = response

			if (status === 400) {
				this.rootStore.errorStore.add(
					'Пользователь c таким email не существует'
				)
			} else {
				this.rootStore.errorStore.add(`Неизвестная ошибка`)
			}
		} finally {
			this.setLoading(false)
		}
	}
}
