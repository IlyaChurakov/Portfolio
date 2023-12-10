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
