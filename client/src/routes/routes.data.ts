import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Profile from '../pages/profile/Profile'
import ProfilePerson from '../pages/profile/ProfilePerson'
import ProfileUsers from '../pages/profile/ProfileUsers'

enum Roles {
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

export const routes: IRoute[] = [
	{
		path: '/',
		component: Home,
	},
	{
		path: '/login',
		component: Login,
	},
	{
		path: '/register',
		component: Register,
	},
	{
		path: '/profile/*',
		component: Profile,
		isAuth: true,
		nestedRoutes: [
			{ path: '', component: ProfilePerson },
			{ path: 'users', component: ProfileUsers, roles: [Roles.Admin] },
		],
	},
]
