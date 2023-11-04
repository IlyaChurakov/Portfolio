import { AxiosResponse } from 'axios'
import $axios from '../http'
import $static from '../http/static'
import { UserResponse } from '../models/response/UsersResponse'

export default class UserService {
	static async getUsersList(): Promise<AxiosResponse<UserResponse[]>> {
		return $axios.get<UserResponse[]>('/user')
	}
	static async deleteAccount(id: number): Promise<void> {
		return $axios.delete(`/user/${id}`)
	}
	static async addRole(id: number, role: string): Promise<void> {
		return $axios.patch(`/user/add-role/${id}`, { role })
	}
	static async deleteRole(id: number, role: string): Promise<void> {
		return $axios.patch(`/user/delete-role/${id}`, { role })
	}
	static async uploadAvatar(id: number, avatar: FormData): Promise<void> {
		return $axios.post(`/user/upload-avatar/${id}`, avatar)
	}
	static async getUserAvatar(avatar: string): Promise<string> {
		const response = await $static.get(`/${avatar}`)
		return `${response.config.baseURL}/${avatar}`
		// if (response.status == 200) {
		// 	const blob = new Blob([response.data], { type: 'image/jpg' }) // Получение файла как Blob

		// 	const imageUrl = URL.createObjectURL(blob)
		// 	return imageUrl
		// } else {
		// 	throw new Error('bla')
		// }
	}
}
