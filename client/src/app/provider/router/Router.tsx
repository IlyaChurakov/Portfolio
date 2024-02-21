import { NotFound } from '@pages/NotFound.tsx'
import { routerConfig } from '@shared/config/index.ts'
import { IRoute } from '@shared/config/router/types.ts'
import { observer } from 'mobx-react-lite'
import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { checkUserRoles } from '../../../shared/utils/utils.ts'
import { RootStore } from '../store/rootStore.ts'
import { RootStoreContext, useStores } from '../store/store.ts'

export const Router = observer(() => {
	const { isLoading, isAuth, user } = useStores(
		RootStoreContext,
		(contextData: RootStore) => contextData,
		(store: RootStore) => store.authStore
	)

	if (isLoading) return <div>Loading...</div>

	function renderRoutes(routes: IRoute[]) {
		return routes.map(route => {
			if (route.isAuth && !isAuth) {
				return null
			}

			return (
				<Route
					key={route.path}
					path={route.path}
					element={
						route.roles && user.roles ? (
							checkUserRoles(route.roles, user.roles) ? (
								<route.component />
							) : (
								<div>Доступ запрещен</div>
							)
						) : (
							<route.component />
						)
					}
				>
					{route.nestedRoutes && renderRoutes(route.nestedRoutes)}
				</Route>
			)
		})
	}

	return (
		<>
			<Suspense fallback={<div>Loading...</div>}>
				<Routes>
					{renderRoutes(routerConfig)}
					<Route path='*' element={<NotFound />} />
				</Routes>
			</Suspense>
		</>
	)
})
