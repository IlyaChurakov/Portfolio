export enum AppRoutes {
	LOGIN = 'login',
	REGISTER = 'register',
	RESTORING_ACCESS = 'restore-access',
	NOT_FOUND = 'notFound',
	HOME = 'home',
	PROJECTS = 'projects',
	PROFILE = 'profile',
	SKILLS = 'skills',
	EDITOR = 'editor',
}

export interface RoutePropsCustom {
	path: string
	element: React.ReactNode
	isAuth?: boolean
	role?: number
	nestedRoutes?: RoutePropsCustom[]
}
