import { lazy } from 'react'

export const LazyHomePage = lazy(async () => await import('./Home'))
export const LazyLoginPage = lazy(async () => await import('./Login'))
export const LazyNotFoundPage = lazy(async () => await import('./NotFound'))
export const LazyRegisterPage = lazy(async () => await import('./Register'))
export const LazyRestoringAccessPage = lazy(
	async () => await import('./RestoringAccess.tsx')
)
export const LazyProfileWrapperPage = lazy(
	async () => await import('./ProfileWrapper')
)
export const LazyProfilePersonPage = lazy(
	async () => await import('./ProfilePerson')
)
export const LazyProfileUsersPage = lazy(
	async () => await import('./ProfileUsers')
)
export const LazyProjectListPage = lazy(
	async () => await import('./ProjectList')
)
export const LazyProjectEditorPage = lazy(
	async () => await import('./ProjectEditor')
)
export const LazyProjectWrapperPage = lazy(
	async () => await import('./ProjectWrapper')
)
export const LazyProjectPage = lazy(async () => await import('./Project'))
