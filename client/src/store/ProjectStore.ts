import { makeAutoObservable } from 'mobx'
import { IProject } from '../models/IProject'
import ProjectService from '../services/Project.service'

export default class ProjectStore {
	projectList = [] as IProject[]

	constructor() {
		makeAutoObservable(this)
	}

	setProjectList(projects: IProject[]) {
		this.projectList = projects
	}

	async createProject(name: string) {
		try {
			const newProject = await ProjectService.createProject(name)
			const projectList = await this.getProjectList()
			this.setProjectList(projectList)
			return newProject
		} catch (err) {
			throw new Error((err as Error).message)
		}
	}
	async getProjectList() {
		try {
			const { data } = await ProjectService.getProjectList()
			this.setProjectList(data)
			return data
		} catch (err) {
			throw new Error((err as Error).message)
		}
	}
	async getProject(id: number) {
		try {
			const { data } = await ProjectService.getProject(id)
			return data
		} catch (err) {
			throw new Error((err as Error).message)
		}
	}
}
