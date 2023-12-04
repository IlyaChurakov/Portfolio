import { AxiosResponse } from 'axios'
import $axios from '../http'
import { IProject } from '../models/IProject'

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
	static async uploadPreview(
		id: string,
		image: FormData
	): Promise<AxiosResponse<IProject>> {
		return $axios.post(`/projects/upload-preview/${id}`, image)
	}
	static async uploadImage(image: FormData): Promise<AxiosResponse<IProject>> {
		return $axios.post(`/projects/upload-image`, image)
	}
	static async deleteAllProjects(): Promise<AxiosResponse<IProject[]>> {
		return $axios.delete<IProject[]>(`/projects`)
	}
}
