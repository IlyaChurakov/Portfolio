import { AuthResponse } from '@app/provider/store/types/response/AuthResponse.types'
import { AxiosResponse } from 'axios'
import { $axios } from '../shared/config/http/axios'

export default class AuthService {
	static async login(
		email: string,
		password: string
	): Promise<AxiosResponse<AuthResponse>> {
		return $axios.post<AuthResponse>('/auth/login', { email, password })
	}

	static async register(
		email: string,
		password: string,
		name: string
	): Promise<AxiosResponse<AuthResponse>> {
		return $axios.post<AuthResponse>('/auth/register', {
			email,
			password,
			name,
		})
	}

	static async logout(): Promise<void> {
		return $axios.post('/auth/logout')
	}
}
