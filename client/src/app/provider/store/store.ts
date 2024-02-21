import { useObserver } from 'mobx-react-lite'
import { createContext, useContext } from 'react'
import { RootStore } from './rootStore'

export const RootStoreContext = createContext<RootStore | null>(null)

export const useStores = <Selection, ContextData, Store>(
	context: React.Context<ContextData | null>,
	storeSelector: (contextData: ContextData) => Store,
	dataSelector: (store: Store) => Selection
) => {
	const value = useContext(context)

	if (!value) throw new Error('Provider does not wrap the application!')

	const store = storeSelector(value)

	return useObserver(() => dataSelector(store))
}
