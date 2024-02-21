import { AuthResponse } from '@app/provider/store/authStore/types/auth.types'
import { apiConfig } from '@shared/config'
import { $axios } from '../shared/config/http/axios'

export default class AuthService {
	static login = async (
		email: string,
		password: string
	): Promise<AuthResponse> => {
		const path = apiConfig.auth.login()

		const { data } = await $axios.post<AuthResponse>(path, {
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

		const { data } = await $axios.post<AuthResponse>(path, {
			email,
			password,
			name,
		})

		return data
	}

	static refresh = async (): Promise<AuthResponse> => {
		const path = apiConfig.auth.refresh()

		const { data } = await $axios.get<AuthResponse>(path, {
			withCredentials: true,
		})

		return data
	}

	static async logout(): Promise<void> {
		const path = apiConfig.auth.logout()
		await $axios.post(path)
	}
}
