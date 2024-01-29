import { IProject } from '@app/provider/store/types/project.types'
import { AxiosResponse } from 'axios'
import { $axios } from '../shared/config/http/axios'

export default class ProjectService {
	static async createProject(name: string): Promise<AxiosResponse<IProject>> {
		return $axios.post<IProject>(`/projects/${name}`)
	}
	static async getProjectList(): Promise<AxiosResponse<IProject[]>> {
		return $axios.get(`/projects`)
	}
	static async getLastProjects(
		count: number
	): Promise<AxiosResponse<IProject[]>> {
		return $axios.get(`/projects/last/${count}`)
	}
	static async getProject(id: string): Promise<AxiosResponse<IProject>> {
		return $axios.get(`/projects/${id}`)
	}
	static async deleteProjectById(id: string): Promise<AxiosResponse<IProject>> {
		return $axios.delete(`/projects/${id}`)
	}
	static async saveProject(
		project: IProject
	): Promise<AxiosResponse<IProject>> {
		return $axios.post<IProject>(`/projects/save`, { project })
	}
	static async assignPreview(
		id: string,
		fileName: string
	): Promise<AxiosResponse<IProject>> {
		return $axios.post(`/projects/assign-preview/${id}`, { fileName })
	}
	static async uploadImage(image: FormData): Promise<AxiosResponse<string>> {
		return $axios.post(`/projects/upload-image`, image)
	}
	static async deleteAllProjects(): Promise<AxiosResponse<IProject[]>> {
		return $axios.delete<IProject[]>(`/projects`)
	}
}
