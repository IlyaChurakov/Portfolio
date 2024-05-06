import { IUser } from '@app/store/authStore/auth.types'
import { apiConfig } from '@shared/config'
import { $axios } from '../shared/config/http/axios'

export default class UserService {
	static async getUsersList() {
		const path = apiConfig.user.all()
		const { data } = await $axios.get<IUser[]>(path)

		return data
	}

	static async deleteFiles(files: string[]): Promise<string[]> {
		const path = apiConfig.user.deleteFiles()

		const { data } = await $axios.delete<{ files: string[] }>(path, {
			data: { files },
		})

		return data.files
	}

	static async deleteAccount(id: string): Promise<IUser> {
		const path = apiConfig.user.deleteAccount(id)
		const { data } = await $axios.delete<IUser>(path)

		return data
	}

	static async changeUserRole(userId: string, role: number): Promise<IUser> {
		const path = apiConfig.user.changeUserRole(userId)
		const { data } = await $axios.patch<IUser>(path, { role })

		return data
	}

	static async updateUser(user: IUser): Promise<IUser> {
		const path = apiConfig.user.update()
		const { data } = await $axios.put(path, { user })

		return data
	}

	static async fetchAvatar(imgPath: string): Promise<any> {
		const { data } = await $axios.get<any>(imgPath)

		const blob = new Blob([data])

		const regex = new RegExp('/([^/]+)$')
		const matches = imgPath.match(regex)
		if (!matches) return

		const file = new File([blob], `${matches[1]}`)

		return file
	}
}
