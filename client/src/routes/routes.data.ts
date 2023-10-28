import Home from '../pages/Home'
import Login from '../pages/Login'
import Profile from '../pages/Profile'

enum Roles {
	Admin = 'admin',
	User = 'user',
}

interface Route {
	path: string
	component: React.ComponentType
	isAuth: boolean
	roles?: Roles[]
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
		path: '/profile',
		component: Profile,
		isAuth: true,
	},
]
