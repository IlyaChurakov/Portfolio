import { AuthStore } from './authStore/AuthStore'
import { ProjectStore } from './projectStore/ProjectStore'
import { UserStore } from './userStore/UserStore'

export class RootStore {
	userStore: UserStore
	projectStore: ProjectStore
	authStore: AuthStore

	constructor() {
		this.userStore = new UserStore(this)
		this.projectStore = new ProjectStore(this)
		this.authStore = new AuthStore()
	}
}
