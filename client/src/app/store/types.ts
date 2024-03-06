import { ProjectStore } from './projectStore/ProjectStore'
import { UserStore } from './userStore/UserStore'

export interface State {
	userStore: UserStore
	projectStore: ProjectStore
}
