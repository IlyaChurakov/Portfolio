import { AxiosResponse } from 'axios'
import $axios from '../http'
import { UserResponse } from '../models/response/UsersResponse'

export default class UserService {
	static async getUsersList(): Promise<AxiosResponse<UserResponse[]>> {
		return $axios.get<UserResponse[]>('/user')
	}
	static async deleteAccount(id: number): Promise<void> {
		return $axios.delete(`/user/${id}`)
	}
}
