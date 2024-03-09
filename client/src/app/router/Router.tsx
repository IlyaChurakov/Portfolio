import { routesSchema } from '@shared/config/router/router.config.tsx'
import { AppRoutes, RoutePropsCustom } from '@shared/config/router/types.ts'
import PageLoader from '@shared/ui/loaders/PageLoader.tsx'
import { observer } from 'mobx-react-lite'
import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Protect from '../Protect/Protect.tsx'

export const Router = observer(() => {
	const renderRoutes = (
		routes:
			| Record<AppRoutes, RoutePropsCustom>[]
			| Record<AppRoutes, RoutePropsCustom>
	) =>
		Object.values(routes).map(route => (
			<Route
				key={route.path}
				path={route.path}
				element={<Protect route={route}>{route.element}</Protect>}
			>
				{route.nestedRoutes && renderRoutes(route.nestedRoutes)}
			</Route>
		))

	const routes = renderRoutes(routesSchema)

	return (
		<Suspense fallback={<PageLoader />}>
			<Routes>{routes}</Routes>
		</Suspense>
	)
})
