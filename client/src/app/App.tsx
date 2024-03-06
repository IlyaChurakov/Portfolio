import Errors from '@widgets/Errors'
import { observer } from 'mobx-react-lite'
import { FC } from 'react'
import { Router } from '.'
import Page from '../shared/layouts/Page'
import '../tailwind.css'
import Menu from '../widgets/Menu'

const App: FC = () => {
	return (
		<>
			<Menu />
			<Page>
				<Router />
			</Page>
			<Errors />
		</>
	)
}

export default observer(App)
