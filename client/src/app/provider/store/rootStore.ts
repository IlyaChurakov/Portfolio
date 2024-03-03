import { AuthStore } from './authStore/AuthStore'
import { ProjectStore } from './projectStore/ProjectStore'
import { UserStore } from './userStore/UserStore'

export class RootStore {
	authStore: AuthStore
	userStore: UserStore
	projectStore: ProjectStore

	constructor() {
		this.authStore = new AuthStore(this)
		this.userStore = new UserStore(this)
		this.projectStore = new ProjectStore(this)
	}
}
