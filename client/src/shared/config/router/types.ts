export enum AppRoles {
	ADMIN = 'admin',
	USER = 'user',
}

export enum AppRoutes {
	LOGIN = 'login',
	REGISTER = 'register',
	RESTORING_ACCESS = 'restore-access',
	NOT_FOUND = 'notFound',
	HOME = 'home',
	PROJECTS = 'projects',
	PROFILE = 'profile',
}

export interface RoutePropsCustom {
	path: string
	element: React.ReactNode
	isAuth?: boolean
	roles?: AppRoles[]
	nestedRoutes?: RoutePropsCustom[]
}
