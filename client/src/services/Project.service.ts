import { AxiosResponse } from 'axios'
import $axios from '../http'
import { IProject } from '../models/IProject'

export default class ProjectService {
	static async createProject(name: string): Promise<AxiosResponse<IProject[]>> {
		return $axios.post<IProject[]>(`/projects/${name}`)
	}
	static async getProjectList(): Promise<AxiosResponse<IProject[]>> {
		return $axios.get(`/projects`)
	}
	static async getProject(
		id: string | undefined
	): Promise<AxiosResponse<IProject> | null> {
		if (typeof id == 'string') {
			return $axios.get(`/projects/${id}`)
		} else {
			return null
		}
	}
}
