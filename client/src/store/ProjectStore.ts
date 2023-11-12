import { makeAutoObservable } from 'mobx'
import ProjectService from '../services/Project.service'
import { IProject } from './../models/IProject'

export default class ProjectStore {
	projectList = [] as IProject[]
	project = {} as IProject

	constructor() {
		makeAutoObservable(this)
	}

	setProjectList(projects: IProject[]) {
		this.projectList = projects
	}
	setProject(project: IProject) {
		this.project = project
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
			console.log(data)
			return data
		} catch (err) {
			throw new Error((err as Error).message)
		}
	}
	async getProject(id: string) {
		try {
			const { data } = await ProjectService.getProject(id)
			this.setProject(data)
			return data
		} catch (err) {
			throw new Error((err as Error).message)
		}
	}
	async saveProject() {
		try {
			const { data } = await ProjectService.saveProject(this.project)
			console.log(data)
		} catch (err) {
			throw new Error((err as Error).message)
		}
	}
	async deleteAllProjects() {
		try {
			await ProjectService.deleteAllProjects()
			this.setProjectList([])
		} catch (err) {
			throw new Error((err as Error).message)
		}
	}
}
