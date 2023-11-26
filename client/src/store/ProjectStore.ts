import { makeAutoObservable } from 'mobx'
import ProjectService from '../services/Project.service'
import { IProject } from './../models/IProject'

export default class ProjectStore {
	projectList = [] as IProject[]
	lastProjects = [] as IProject[]
	project = {} as IProject
	saved: boolean = true

	constructor() {
		makeAutoObservable(this)
	}

	setProjectList(projects: IProject[]) {
		this.projectList = projects
	}
	setLastProjects(projects: IProject[]) {
		this.lastProjects = projects
	}
	setProject(project: IProject) {
		this.project = project
		this.setSaved(false)
	}
	setSaved(bool: boolean) {
		this.saved = bool
	}

	async createProject(name: string) {
		try {
			const { data } = await ProjectService.createProject(name)
			this.setProject(data)

			const projectList = await this.getProjectList()
			this.setProjectList(projectList)
			return data
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
	async getLastProjects(count: number) {
		try {
			const { data } = await ProjectService.getLastProjects(count)
			this.setLastProjects(data)

			return data
		} catch (err) {
			throw new Error((err as Error).message)
		}
	}
	async getProject(id: string) {
		try {
			const { data } = await ProjectService.getProject(id)
			this.setProject(data)
			// эта функция срабатывает при первой загрузке редактирования проекта, поэтому ставим сохранение в true, при всех остальных вариантах будет false
			this.setSaved(true)

			return data
		} catch (err) {
			throw new Error((err as Error).message)
		}
	}
	async deleteProjectById(id: string) {
		try {
			const { data } = await ProjectService.deleteProjectById(id)

			const projects = await this.getProjectList()
			this.setProjectList(projects)

			return data
		} catch (err) {
			throw new Error((err as Error).message)
		}
	}
	async saveProject() {
		try {
			await ProjectService.saveProject(this.project)
			this.setSaved(true)
		} catch (err) {
			throw new Error((err as Error).message)
		}
	}
	async uploadPreview(id: string, image: FormData) {
		try {
			const { data } = await ProjectService.uploadPreview(id, image)

			this.setProject(data)
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
