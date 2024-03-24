import Errors from '@widgets/Errors'
import { Router } from '.'
import Page from '../shared/layouts/Page'
import '../tailwind.css'
import Menu from '../widgets/Menu'

const App = () => {
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

export default App
