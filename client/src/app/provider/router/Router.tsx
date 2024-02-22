import { routerConfig } from '@shared/config/index.ts'
import {
	AppRoutesPrivate,
	AppRoutesPublic,
	RoutePropsCustom,
} from '@shared/config/router/types.ts'
import Loader from '@shared/ui/loaders/Loader.tsx'
import { observer } from 'mobx-react-lite'
import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Protect from '../Protect/Protect.tsx'

export const Router = observer(() => {
	const renderRoutesPrivate = (
		routes:
			| Record<AppRoutesPublic, RoutePropsCustom>[]
			| Record<AppRoutesPublic, RoutePropsCustom>
			| Record<AppRoutesPrivate, RoutePropsCustom>[]
			| Record<AppRoutesPrivate, RoutePropsCustom>
	) =>
		Object.values(routes).map(route => (
			<Route
				key={route.path}
				path={route.path}
				element={<Protect route={route}>{route.element}</Protect>}
			>
				{route.nestedRoutes && renderRoutesPrivate(route.nestedRoutes)}
			</Route>
		))

	const renderRoutesPublic = (
		routes:
			| Record<AppRoutesPublic, RoutePropsCustom>[]
			| Record<AppRoutesPublic, RoutePropsCustom>
			| Record<AppRoutesPrivate, RoutePropsCustom>[]
			| Record<AppRoutesPrivate, RoutePropsCustom>
	) => {
		return Object.values(routes).map(route => {
			return (
				<Route key={route.path} path={route.path} element={route.element}>
					{route.nestedRoutes && renderRoutesPublic(route.nestedRoutes)}
				</Route>
			)
		})
	}

	const routes = [
		...renderRoutesPrivate(routerConfig.privateRoutes),
		...renderRoutesPublic(routerConfig.publicRoutes),
	]

	return (
		<Suspense fallback={<Loader />}>
			<Routes>{routes}</Routes>
		</Suspense>
	)
})
