import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Context } from '../main.tsx'
import NotFound from '../pages/NotFound.tsx'
import { checkUserRoles } from '../utils/functions.ts'
import { IRoute, routes } from './routes.data.ts'

const Router = () => {
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
			<Routes>
				{renderRoutes(routes)}
				<Route path='*' element={<NotFound />} />
			</Routes>
		</>
	)
}

export default observer(Router)
