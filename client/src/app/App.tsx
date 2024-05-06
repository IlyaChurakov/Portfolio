import Errors from '@widgets/Errors'
import Page from '../shared/layouts/Page'
import '../tailwind.css'
import Menu from '../widgets/Menu'
import { Router } from './Router'

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
