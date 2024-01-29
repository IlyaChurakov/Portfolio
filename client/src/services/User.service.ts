import { UserResponse } from '@app/provider/store/types/response/UserResponse.types'
import { IUser } from '@app/provider/store/types/user.types'
import { AxiosResponse } from 'axios'
import { $axios } from '../shared/config/http/axios'

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
	static async changeDescription(
		id: number,
		description: string
	): Promise<AxiosResponse<IUser>> {
		return $axios.post(`/user/change-description/${id}`, { description })
	}
	static async deleteRole(id: number, role: string): Promise<void> {
		return $axios.patch(`/user/delete-role/${id}`, { role })
	}
	static async assignAvatar(
		id: string,
		avatar: string
	): Promise<AxiosResponse<IUser>> {
		return $axios.post(`/user/assign-avatar/${id}`, { avatar })
	}
}
