import { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import { ProjectStore } from './app/provider/store/ProjectStore.ts'
import { UserStore } from './app/provider/store/UserStore.ts'

interface State {
	store: UserStore
	projectStore: ProjectStore
}

const store = new UserStore()
const projectStore = new ProjectStore()

export const Context = createContext<State>({
	store,
	projectStore,
})

ReactDOM.createRoot(document.getElementById('root')!).render(
	// <React.StrictMode>
	<BrowserRouter>
		<Context.Provider value={{ store, projectStore }}>
			<App />
		</Context.Provider>
	</BrowserRouter>
	// </React.StrictMode>
)
