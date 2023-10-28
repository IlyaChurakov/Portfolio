import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import UserStore from './store/UserStore.ts'

interface State {
	store: UserStore
}

const store = new UserStore()

export const Context = createContext<State>({
	store,
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
			<Context.Provider value={{ store }}>
				<QueryClientProvider client={queryClient}>
					<App />
				</QueryClientProvider>
			</Context.Provider>
		</BrowserRouter>
	</React.StrictMode>
)
