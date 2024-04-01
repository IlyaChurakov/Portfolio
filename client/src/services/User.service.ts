import { IUser } from '@app/store/authStore/types/auth.types'
import { apiConfig } from '@shared/config'
import { $axios } from '../shared/config/http/axios'

export default class UserService {
	static async getUsersList(): Promise<IUser[]> {
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

	static async addRole(id: string, role: string): Promise<IUser> {
		const path = apiConfig.user.addRole(id)
		const { data } = await $axios.patch<IUser>(path, { role })

		return data
	}

	static async update(user: IUser): Promise<IUser> {
		const path = apiConfig.user.update()
		const { data } = await $axios.put(path, { user })

		return data
	}

	static async deleteRole(id: string, role: string): Promise<IUser> {
		const path = apiConfig.user.deleteRole(id)
		const { data } = await $axios.patch(path, { role })

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
