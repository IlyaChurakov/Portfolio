import { makeAutoObservable } from 'mobx'
import ProjectService from '../../../services/Project.service'
import { IProject } from './types/project.types'

export class ProjectStore {
	projectList = [] as IProject[]
	lastProjects = [] as IProject[]
	project = {} as IProject
	saved: boolean = true
	loading: boolean = false

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
	setLoading(bool: boolean) {
		this.loading = bool
	}

	async createProject(name: string) {
		try {
			this.setLoading(true)
			const { data } = await ProjectService.createProject(name)
			this.setLoading(false)

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
			this.setLoading(true)
			const { data } = await ProjectService.getProjectList()
			this.setLoading(false)

			this.setProjectList(data)

			return data
		} catch (err) {
			throw new Error((err as Error).message)
		}
	}
	async getLastProjects(count: number) {
		try {
			this.setLoading(true)
			const { data } = await ProjectService.getLastProjects(count)
			this.setLoading(false)

			this.setLastProjects(data)

			return data
		} catch (err) {
			throw new Error((err as Error).message)
		}
	}
	async getProject(id: string) {
		try {
			this.setLoading(true)
			const { data } = await ProjectService.getProject(id)
			this.setLoading(false)

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
			this.setLoading(true)
			const { data } = await ProjectService.deleteProjectById(id)
			this.setLoading(false)

			const projects = await this.getProjectList()
			this.setProjectList(projects)

			return data
		} catch (err) {
			throw new Error((err as Error).message)
		}
	}
	async saveProject() {
		try {
			this.setLoading(true)
			await ProjectService.saveProject(this.project)
			this.setLoading(false)

			this.setSaved(true)
		} catch (err) {
			throw new Error((err as Error).message)
		}
	}
	async assignPreview(id: string, fileName: string) {
		try {
			this.setLoading(true)
			const { data } = await ProjectService.assignPreview(id, fileName)
			this.setLoading(false)

			this.setProject(data)
		} catch (err) {
			throw new Error((err as Error).message)
		}
	}
	async uploadImage(image: FormData) {
		try {
			this.setLoading(true)
			const { data } = await ProjectService.uploadImage(image)
			this.setLoading(false)

			return data
		} catch (err) {
			throw new Error((err as Error).message)
		}
	}
	async deleteAllProjects() {
		try {
			this.setLoading(true)
			await ProjectService.deleteAllProjects()
			this.setLoading(false)

			this.setProjectList([])
		} catch (err) {
			throw new Error((err as Error).message)
		}
	}
}
