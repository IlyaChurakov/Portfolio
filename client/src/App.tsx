import { Router } from '@app/provider'
import { observer } from 'mobx-react-lite'
import { FC } from 'react'
import Page from './shared/layouts/Page'
import Menu from './shared/ui/Menu'
import './tailwind.css'

const App: FC = () => {
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
