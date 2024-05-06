import { AuthResponse } from '@app/store/authStore/auth.types'
import { apiConfig } from '@shared/config'
import { $axios, AuthClient } from '../shared/config/http/axios'

export default class AuthService {
	static login = async (
		email: string,
		password: string
	): Promise<AuthResponse> => {
		const path = apiConfig.auth.login()

		const { data } = await AuthClient.post<AuthResponse>(path, {
			email,
			password,
		})

		return data
	}

	static register = async (
		email: string,
		password: string,
		name: string
	): Promise<AuthResponse> => {
		const path = apiConfig.auth.register()

		const { data } = await AuthClient.post<AuthResponse>(path, {
			email,
			password,
			name,
		})

		return data
	}

	static refresh = async (): Promise<AuthResponse> => {
		const path = apiConfig.auth.refresh()

		const { data } = await AuthClient.post<AuthResponse>(path)

		return data
	}

	static async logout(): Promise<void> {
		const path = apiConfig.auth.logout()
		await AuthClient.post(path)
	}

	static async requestRestoreAccess(email: string): Promise<void> {
		const path = apiConfig.user.resetMail()
		await $axios.post(path, { email })
	}

	static async changePassword(password: string, link: string): Promise<void> {
		const path = apiConfig.user.changePassword()
		await $axios.post(path, { password, link })
	}
}
