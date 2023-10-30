import { observer } from 'mobx-react-lite'
import { FC, useContext, useEffect } from 'react'
import Page from './layouts/Page'
import { Context } from './main'
import Router from './routes/Router'
import './tailwind.css'

const App: FC = () => {
	const { store } = useContext(Context)

	useEffect(() => {
		if (localStorage.getItem('token')) {
			store.checkAuth()
		}
	}, [])

	return (
		<>
			<Page>
				<Router />
			</Page>
		</>
	)
}

export default observer(App)
