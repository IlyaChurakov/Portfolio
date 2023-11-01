import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Context } from '../main.tsx'
import NotFound from '../pages/NotFound.tsx'
import { IRoute, routes } from './routes.data.ts'

const Router = () => {
	const { store } = useContext(Context)

	if (store.isLoading) return <div>Loading...</div>

	function renderRoutes(routes: IRoute[]) {
		return routes.map(route => {
			if (route.isAuth && !store.isAuth) return false

			return (
				<Route key={route.path} path={route.path} element={<route.component />}>
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
