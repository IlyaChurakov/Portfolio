import { Home } from '@pages/Home'
import { Login } from '@pages/Login'
import { Register } from '@pages/Register'
import { Test } from '@pages/Test'
import { Profile } from '@pages/profile/Profile'
import { ProfilePerson } from '@pages/profile/ProfilePerson'
import { ProfileUsers } from '@pages/profile/ProfileUsers'
import { EditProject } from '@pages/projects/EditProject'
import { ProjectList } from '@pages/projects/ProjectList'
import { Projects } from '@pages/projects/Projects'
import { SingleProject } from '@pages/projects/SingleProject'
import { IRoute, Roles } from './types'

export const routerConfig: IRoute[] = [
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
	{
		path: '/projects/*',
		component: Projects,
		nestedRoutes: [
			{ path: '', component: ProjectList },
			{ path: ':id', component: SingleProject },
			{
				path: ':id/edit',
				isAuth: true,
				component: EditProject,
				roles: [Roles.Admin],
			},
		],
	},
	{
		path: '/test',
		component: Test,
	},
]
