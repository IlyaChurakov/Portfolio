import { RootStore } from '@app/store/rootStore.ts'
import { RootStoreContext } from '@app/store/store.ts'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './app/App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<RootStoreContext.Provider value={new RootStore()}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</RootStoreContext.Provider>
)
