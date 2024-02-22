export enum Roles {
	Admin = 'admin',
	User = 'user',
}

export interface IRoute {
	path: string
	component: React.ComponentType
	isAuth?: boolean
	roles?: Roles[]
	nestedRoutes?: IRoute[]
}

export enum AppRoles {
	ADMIN = 'ADMIN',
	USER = 'USER',
	DEVELOPER = 'DEVELOPER',
}

export enum AppRoutesPublic {
	LOGIN = 'login',
	REGISTER = 'register',
	NOT_FOUND = 'notFound',
	HOME = 'home',
	PROJECTS = 'projects',
}

export enum AppRoutesPrivate {
	PROFILE = 'profile',
}

export interface RoutePropsCustom {
	path: string
	element: React.ReactNode
	roles?: AppRoles[]
	nestedRoutes?: RoutePropsCustom[]
}
