import { Router } from '@app/provider'
import { observer } from 'mobx-react-lite'
import { FC, useContext, useEffect } from 'react'
import { Context } from './main'
import Page from './shared/layouts/Page'
import Menu from './shared/ui/Menu'
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
			<Menu />
			<Page>
				<Router />
			</Page>
		</>
	)
}

export default observer(App)
