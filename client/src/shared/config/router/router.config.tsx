import {
	LazyEditorPage,
	LazyHomePage,
	LazyLoginPage,
	LazyNotFoundPage,
	LazyProfilePersonPage,
	LazyProfileUsersPage,
	LazyProfileWrapperPage,
	LazyProjectPage,
	LazyProjectWrapperPage,
	LazyProjects,
	LazyRegisterPage,
	LazyRestoringAccessPage,
	LazySkillWrapperPage,
	LazySkillsPage,
} from '../../../pages/index'

import { AppRoles, AppRoutes, RoutePropsCustom } from './types'

export const RoutePaths: Record<AppRoutes, string> = {
	[AppRoutes.HOME]: '/',
	[AppRoutes.LOGIN]: '/login',
	[AppRoutes.REGISTER]: '/register',
	[AppRoutes.RESTORING_ACCESS]: '/restore-access/*',
	[AppRoutes.PROFILE]: '/profile/*',
	[AppRoutes.PROJECTS]: '/projects/*',
	[AppRoutes.EDITOR]: '/editor/:id',
	[AppRoutes.SKILLS]: '/skills/*',
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
	[AppRoutes.RESTORING_ACCESS]: {
		path: RoutePaths['restore-access'],
		element: <LazyRestoringAccessPage />,
	},
	[AppRoutes.EDITOR]: {
		path: RoutePaths.editor,
		element: <LazyEditorPage />,
		isAuth: true,
		roles: [AppRoles.ADMIN],
	},
	[AppRoutes.PROJECTS]: {
		path: RoutePaths.projects,
		element: <LazyProjectWrapperPage />,
		nestedRoutes: [
			{
				path: '',
				element: <LazyProjects />,
			},
			{
				path: ':id',
				element: <LazyProjectPage />,
			},
		],
	},
	[AppRoutes.SKILLS]: {
		path: RoutePaths.skills,
		element: <LazySkillWrapperPage />,
		nestedRoutes: [
			{
				path: '',
				element: <LazySkillsPage />,
			},
			{
				path: ':id',
				element: <LazyProjectPage />,
			},
		],
	},
	[AppRoutes.NOT_FOUND]: {
		path: RoutePaths.notFound,
		element: <LazyNotFoundPage />,
	},
	[AppRoutes.PROFILE]: {
		path: RoutePaths.profile,
		element: <LazyProfileWrapperPage />,
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
