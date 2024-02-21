import { Router, useStores } from '@app/provider'
import { RootStore } from '@app/provider/store/rootStore'
import { RootStoreContext } from '@app/provider/store/store'
import { observer } from 'mobx-react-lite'
import { FC, useEffect } from 'react'
import Page from './shared/layouts/Page'
import Menu from './shared/ui/Menu'
import './tailwind.css'

const App: FC = () => {
	const { checkAuth } = useStores(
		RootStoreContext,
		(contextData: RootStore) => contextData,
		(store: RootStore) => store.authStore
	)

	useEffect(() => {
		if (localStorage.getItem('token')) {
			checkAuth()
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
