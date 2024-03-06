import { AuthStore } from './authStore/AuthStore'
import { ErrorStore } from './errorStore/ErrorStore'
import { ProjectStore } from './projectStore/ProjectStore'
import { UserStore } from './userStore/UserStore'

export class RootStore {
	authStore: AuthStore
	userStore: UserStore
	projectStore: ProjectStore
	errorStore: ErrorStore

	constructor() {
		this.authStore = new AuthStore(this)
		this.userStore = new UserStore(this)
		this.projectStore = new ProjectStore(this)
		this.errorStore = new ErrorStore(this)
	}
}
