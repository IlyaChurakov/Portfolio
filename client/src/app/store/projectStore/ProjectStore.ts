import { makeAutoObservable, runInAction } from 'mobx'
import ProjectService from '../../../services/Project.service'
import { RootStore } from '../rootStore'
import { IProject } from './types/project.types'

export class ProjectStore {
	private rootStore: RootStore

	project: IProject
	projectList: IProject[]
	lastProjects: IProject[]
	saved: boolean
	loading: boolean

	constructor(rootStore: RootStore) {
		makeAutoObservable(this)

		this.rootStore = rootStore

		this.projectList = [] as IProject[]
		this.project = {} as IProject
		this.lastProjects = [] as IProject[]
		this.saved = true
		this.loading = false
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
		console.log(this.project)
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
	async getProjectList(count?: number): Promise<IProject[]> {
		try {
			const { data } = await ProjectService.getProjectList(count)

			this.setProjectList(data)

			return data
		} catch (err) {
			throw new Error((err as Error).message)
		}
	}
	async getProject(id: string) {
		try {
			this.setLoading(true)
			const { data } = await ProjectService.getProject(id)

			runInAction(() => {
				this.setLoading(false)
				this.setProject(data)
				// эта функция срабатывает при первой загрузке редактирования проекта, поэтому ставим сохранение в true, при всех остальных вариантах будет false
				this.setSaved(true)
			})

			return data
		} catch (err) {
			this.setLoading(false)
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
	async archiveProject(id: string, bool: boolean) {
		try {
			this.setLoading(true)
			const { data } = await ProjectService.archiveProject(id, bool)
			this.setLoading(false)

			await this.getProjectList()

			return data
		} catch (err) {
			console.log(err)
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
	async assignPreview(id: string, imgPath: string | undefined) {
		try {
			this.setLoading(true)
			const { data } = await ProjectService.assignPreview(id, imgPath)
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
}
