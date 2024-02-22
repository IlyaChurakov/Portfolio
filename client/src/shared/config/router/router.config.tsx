import {
	LazyEditProjectPage,
	LazyLoginPage,
	LazyNotFoundPage,
	LazyProfilePage,
	LazyProfilePersonPage,
	LazyProfileUsersPage,
	LazyProjectListPage,
	LazyProjectsPage,
	LazySingleProjectPage,
} from '../../../pages/index'

import { LazyHomePage, LazyRegisterPage } from '@pages/index'
import {
	AppRoles,
	AppRoutesPrivate,
	AppRoutesPublic,
	IRoute,
	Roles,
	RoutePropsCustom,
} from './types'

export const RoutePaths: Record<AppRoutesPublic | AppRoutesPrivate, string> = {
	[AppRoutesPublic.HOME]: '/',
	[AppRoutesPublic.LOGIN]: '/login',
	[AppRoutesPublic.REGISTER]: '/register',
	[AppRoutesPrivate.PROFILE]: '/profile/',
	[AppRoutesPublic.PROJECTS]: '/projects/',
	[AppRoutesPublic.NOT_FOUND]: '*',
}

export const publicRoutes: Record<AppRoutesPublic, RoutePropsCustom> = {
	[AppRoutesPublic.HOME]: {
		path: RoutePaths.home,
		element: <LazyHomePage />,
	},
	[AppRoutesPublic.LOGIN]: {
		path: RoutePaths.login,
		element: <LazyLoginPage />,
	},
	[AppRoutesPublic.REGISTER]: {
		path: RoutePaths.register,
		element: <LazyRegisterPage />,
	},
	[AppRoutesPublic.PROJECTS]: {
		path: RoutePaths.projects,
		element: <LazyProjectsPage />,
		nestedRoutes: [
			{
				path: '',
				element: <LazyProjectListPage />,
			},
			{
				path: ':id',
				element: <LazySingleProjectPage />,
			},
			{
				path: ':id/edit',
				element: <LazyEditProjectPage />,
				roles: [AppRoles.ADMIN],
			},
		],
	},
	[AppRoutesPublic.NOT_FOUND]: {
		path: RoutePaths.notFound,
		element: <LazyNotFoundPage />,
	},
}

export const privateRoutes: Record<AppRoutesPrivate, RoutePropsCustom> = {
	[AppRoutesPrivate.PROFILE]: {
		path: RoutePaths.profile,
		element: <LazyProfilePersonPage />,
		// nestedRoutes: [
		// 	{
		// 		path: '',
		// 		element: <LazyProfilePersonPage />,
		// 	},
		// 	{
		// 		path: 'users',
		// 		element: <LazyProfileUsersPage />,
		// 		roles: [AppRoles.ADMIN],
		// 	},
		// ],
	},
}

export const routerConfig = {
	privateRoutes,
	publicRoutes,
}

export const routerConfigq: IRoute[] = [
	{
		path: '/',
		component: LazyHomePage,
	},
	{
		path: '/login',
		component: LazyLoginPage,
	},
	{
		path: '/register',
		component: LazyRegisterPage,
	},
	{
		path: '/profile/*',
		component: LazyProfilePage,
		isAuth: true,
		nestedRoutes: [
			{ path: '', component: LazyProfilePersonPage },
			{ path: 'users', component: LazyProfileUsersPage, roles: [Roles.Admin] },
		],
	},
	{
		path: '/projects/*',
		component: LazyProjectsPage,
		nestedRoutes: [
			{ path: '', component: LazyProjectListPage },
			{ path: ':id', component: LazySingleProjectPage },
			{
				path: ':id/edit',
				isAuth: true,
				component: LazyEditProjectPage,
				roles: [Roles.Admin],
			},
		],
	},
]
