import { useStores } from '@app/provider'
import { RootStore } from '@app/provider/store/rootStore'
import { RootStoreContext } from '@app/provider/store/store'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { renderContent } from './utils/renderContent'

export const SingleProject = observer(() => {
	const { id } = useParams()

	const projectStore = useStores(
		RootStoreContext,
		(contextData: RootStore) => contextData,
		(store: RootStore) => store.projectStore
	)

	useEffect(() => {
		if (id) projectStore.getProject(id)
	}, [id])

	return (
		<div>
			{projectStore.loading ? (
				<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-bold text-2xl'>
					Загрузка
				</div>
			) : (
				<div>
					{projectStore.project ? (
						renderContent(projectStore.project)
					) : (
						<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-bold text-2xl'>
							Проект не найден
						</div>
					)}
				</div>
			)}
		</div>
	)
})
