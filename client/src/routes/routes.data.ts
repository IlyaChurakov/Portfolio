import Home from '../pages/Home'
import Login from '../pages/Login'
import Profile from '../pages/Profile'
import ProfilePerson from '../pages/ProfilePerson'
import ProfileUsers from '../pages/ProfileUsers'

enum Roles {
	Admin = 'admin',
	User = 'user',
}

interface Route {
	path: string
	component: React.ComponentType
	isAuth?: boolean
	roles?: Roles[]
	nestedRoutes?: Route[]
}

export const routes: Route[] = [
	{
		path: '/',
		component: Home,
		isAuth: true,
	},
	{
		path: '/login',
		component: Login,
		isAuth: false,
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
