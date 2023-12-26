import { NotFound } from '@pages/NotFound.tsx'
import { routerConfig } from '@shared/config/index.ts'
import { IRoute } from '@shared/config/router/types.ts'
import { observer } from 'mobx-react-lite'
import { Suspense, useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Context } from '../../../main.tsx'
import { checkUserRoles } from '../../../utils/functions.ts'

export const Router = observer(() => {
	const { store } = useContext(Context)

	if (store.isLoading) return <div>Loading...</div>

	function renderRoutes(routes: IRoute[]) {
		return routes.map(route => {
			if (route.isAuth && !store.isAuth) {
				return null
			}

			return (
				<Route
					key={route.path}
					path={route.path}
					element={
						route.roles && store.user.roles ? (
							checkUserRoles(route.roles, store.user.roles) ? (
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
