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
export const LazyProjects = lazy(async () => await import('./Projects.tsx'))
export const LazyEditorPage = lazy(async () => await import('./EditorPage.tsx'))
export const LazyProjectWrapperPage = lazy(
	async () => await import('./ProjectWrapper')
)
export const LazyProjectPage = lazy(async () => await import('./Project'))
export const LazySkillsPage = lazy(async () => await import('./Skills'))
export const LazySkillWrapperPage = lazy(
	async () => await import('./SkillWrapper')
)
