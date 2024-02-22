import { lazy } from 'react'

// export { Home } from './Home.tsx'
// export { Login } from './Login.tsx'
// export { NotFound } from './NotFound.tsx'
// export { Register } from './Register.tsx'
// export { Profile } from './profile/Profile.tsx'
// export { ProfilePerson } from './profile/ProfilePerson.tsx'
// export { ProfileUsers } from './profile/ProfileUsers.tsx'
// export { ProjectList } from './projects/ProjectList.tsx'
// export { Projects } from './projects/Projects.tsx'
// export { SingleProject } from './projects/SingleProject.tsx'

export const LazyHomePage = lazy(async () => await import('./Home'))
export const LazyLoginPage = lazy(async () => await import('./Login'))
export const LazyNotFoundPage = lazy(async () => await import('./NotFound'))
export const LazyRegisterPage = lazy(async () => await import('./Home'))
export const LazyProfilePage = lazy(
	async () => await import('./profile/Profile')
)
export const LazyProfilePersonPage = lazy(
	async () => await import('./profile/ProfilePerson')
)
export const LazyProfileUsersPage = lazy(
	async () => await import('./profile/ProfileUsers')
)
export const LazyProjectListPage = lazy(
	async () => await import('./projects/ProjectList')
)
export const LazyEditProjectPage = lazy(
	async () => await import('./projects/page-constructor/EditProject')
)
export const LazyProjectsPage = lazy(
	async () => await import('./projects/Projects')
)
export const LazySingleProjectPage = lazy(
	async () => await import('./projects/SingleProject')
)
