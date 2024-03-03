import {
	LazyEditProjectPage,
	LazyHomePage,
	LazyLoginPage,
	LazyNotFoundPage,
	LazyProfilePage,
	LazyProfilePersonPage,
	LazyProfileUsersPage,
	LazyProjectListPage,
	LazyProjectsPage,
	LazyRegisterPage,
	LazySingleProjectPage,
} from '../../../pages/index'

import { AppRoles, AppRoutes, RoutePropsCustom } from './types'

export const RoutePaths: Record<AppRoutes, string> = {
	[AppRoutes.HOME]: '/',
	[AppRoutes.LOGIN]: '/login',
	[AppRoutes.REGISTER]: '/register',
	[AppRoutes.PROFILE]: '/profile/*',
	[AppRoutes.PROJECTS]: '/projects/*',
	[AppRoutes.NOT_FOUND]: '*',
}

export const routesSchema: Record<AppRoutes, RoutePropsCustom> = {
	[AppRoutes.HOME]: {
		path: RoutePaths.home,
		element: <LazyHomePage />,
	},
	[AppRoutes.LOGIN]: {
		path: RoutePaths.login,
		element: <LazyLoginPage />,
	},
	[AppRoutes.REGISTER]: {
		path: RoutePaths.register,
		element: <LazyRegisterPage />,
	},
	[AppRoutes.PROJECTS]: {
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
				isAuth: true,
				roles: [AppRoles.ADMIN],
			},
		],
	},
	[AppRoutes.NOT_FOUND]: {
		path: RoutePaths.notFound,
		element: <LazyNotFoundPage />,
	},
	[AppRoutes.PROFILE]: {
		path: RoutePaths.profile,
		element: <LazyProfilePage />,
		nestedRoutes: [
			{
				path: '',
				isAuth: true,
				element: <LazyProfilePersonPage />,
			},
			{
				path: 'users',
				element: <LazyProfileUsersPage />,
				isAuth: true,
				roles: [AppRoles.ADMIN],
			},
		],
	},
}
