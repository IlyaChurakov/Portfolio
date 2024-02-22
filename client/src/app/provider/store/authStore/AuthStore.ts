import { AxiosError } from 'axios'
import { makeAutoObservable, runInAction } from 'mobx'
import AuthService from '../../../../services/Auth.service'
import { IUser } from './types/auth.types'

export class AuthStore {
	user: IUser
	isAuth: boolean
	isLoading: boolean
	error: AxiosError | undefined

	constructor() {
		makeAutoObservable(this)

		this.user = {} as IUser
		this.isAuth = false
		this.isLoading = false
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
	setError(err: AxiosError) {
		this.error = err
	}

	register = async (email: string, password: string, name: string) => {
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

	login = async (email: string, password: string) => {
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

	logout = async () => {
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

	checkAuth = async () => {
		try {
			this.setLoading(true)

			const authResponse = await AuthService.refresh()

			localStorage.setItem('token', authResponse.accessToken)

			runInAction(() => {
				this.setAuth(true)
				this.setUser(authResponse.user)
			})

			return true
		} catch (err) {
			this.setError(err as AxiosError)
		} finally {
			this.setLoading(false)
		}
	}
}
