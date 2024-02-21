import { IUser } from '@app/provider/store/authStore/types/auth.types'
import { apiConfig } from '@shared/config'
import { AxiosResponse } from 'axios'
import { $axios } from '../shared/config/http/axios'

export default class UserService {
	static async getUsersList(): Promise<IUser[]> {
		const path = apiConfig.user.all()

		const { data } = await $axios.get<IUser[]>(path)

		return data
	}

	static async deleteAccount(id: string): Promise<IUser> {
		const path = apiConfig.user.deleteAccount(id)

		const { data } = await $axios.delete<IUser>(path)

		return data
	}

	static async addRole(id: string, role: string): Promise<void> {
		const path = apiConfig.user.addRole(id)
		return await $axios.patch(path, { role })
	}

	static async changeDescription(
		id: string,
		description: string
	): Promise<AxiosResponse<IUser>> {
		const path = apiConfig.user.addDescription(id)
		return await $axios.post(path, { description })
	}

	static async deleteRole(id: string, role: string): Promise<void> {
		const path = apiConfig.user.deleteRole(id)
		return await $axios.patch(path, { role })
	}

	static async assignAvatar(
		id: string,
		avatar: string
	): Promise<AxiosResponse<IUser>> {
		const path = apiConfig.user.uploadAvatar(id)
		return await $axios.post(path, { avatar })
	}
}
