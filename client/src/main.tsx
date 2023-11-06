import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import ProjectStore from './store/ProjectStore.ts'
import UserStore from './store/UserStore.ts'

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

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
})

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<BrowserRouter>
			<Context.Provider value={{ store, projectStore }}>
				<QueryClientProvider client={queryClient}>
					<App />
				</QueryClientProvider>
			</Context.Provider>
		</BrowserRouter>
	</React.StrictMode>
)
