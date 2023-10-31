import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Context } from '../main.tsx'
import NotFound from '../pages/NotFound.tsx'
import { routes } from './routes.data.ts'

const Router = () => {
	const { store } = useContext(Context)

	if (store.isLoading) return <div>Loading...</div>

	return (
		<>
			<Routes>
				{routes.map(item => {
					if (item.isAuth && !store.isAuth) {
						return false
					}

					return (
						<Route
							key={item.path}
							path={item.path}
							element={<item.component />}
						>
							{item.nestedRoutes &&
								item.nestedRoutes.map(nestedItem => {
									return (
										<Route
											key={nestedItem.path}
											path={nestedItem.path}
											element={<nestedItem.component />}
										/>
									)
								})}
						</Route>
					)
					// return (
					// 	<Route
					// 		key={item.path}
					// 		path={item.path}
					// 		element={<item.component />}
					// 	/>
					// )
				})}
				<Route path='*' element={<NotFound />} />
			</Routes>
		</>
	)
}

export default observer(Router)
