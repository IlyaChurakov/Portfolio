import { RootStore } from '@app/provider/store/rootStore.ts'
import { RootStoreContext } from '@app/provider/store/store.ts'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<BrowserRouter>
		<RootStoreContext.Provider value={new RootStore()}>
			<App />
		</RootStoreContext.Provider>
	</BrowserRouter>
)
