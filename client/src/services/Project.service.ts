import { IProject } from '@app/store/projectStore/types/project.types'
import { apiConfig } from '@shared/config'
import { AxiosResponse } from 'axios'
import { $axios } from '../shared/config/http/axios'

export default class ProjectService {
	static async createProject(name: string): Promise<AxiosResponse<IProject>> {
		const path = apiConfig.projects.create(name)
		return await $axios.post<IProject>(path)
	}

	static async getProjectList(
		count?: number
	): Promise<AxiosResponse<IProject[]>> {
		const path = count
			? apiConfig.projects.last(count)
			: apiConfig.projects.all()
		return await $axios.get<IProject[]>(path)
	}

	static async getProject(id: string): Promise<AxiosResponse<IProject>> {
		const path = apiConfig.projects.one(id)
		return await $axios.get<IProject>(path)
	}

	static async deleteProjectById(id: string): Promise<AxiosResponse<IProject>> {
		const path = apiConfig.projects.one(id)
		return await $axios.delete<IProject>(path)
	}

	static async archiveProject(
		id: string,
		bool: boolean
	): Promise<AxiosResponse<IProject>> {
		const path = apiConfig.projects.archive()
		return await $axios.put<IProject>(path, { id, bool })
	}

	static async saveProject(
		project: IProject
	): Promise<AxiosResponse<IProject>> {
		const path = apiConfig.projects.save()
		return await $axios.post<IProject>(path, { project })
	}

	static async assignPreview(
		id: string,
		imgPath: string | undefined
	): Promise<AxiosResponse<IProject>> {
		const path = apiConfig.projects.assignPreview(id)
		return await $axios.post<IProject>(path, { imgPath })
	}

	static async uploadImage(image: FormData): Promise<AxiosResponse<string>> {
		const path = apiConfig.projects.uploadImage()
		return await $axios.post<string>(path, image)
	}
}
