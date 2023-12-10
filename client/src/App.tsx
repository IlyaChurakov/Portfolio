import { Router } from '@app/provider'
import { observer } from 'mobx-react-lite'
import { FC, useContext, useEffect } from 'react'
import Page from './layouts/Page'
import { Context } from './main'
import './tailwind.css'
import Menu from './ui/Menu'

const App: FC = () => {
	const { store } = useContext(Context)

	useEffect(() => {
		if (localStorage.getItem('token')) {
			store.checkAuth()
		}
	}, [])

	return (
		<>
			<Menu />
			<Page>
				<Router />
			</Page>
		</>
	)
}

export default observer(App)
