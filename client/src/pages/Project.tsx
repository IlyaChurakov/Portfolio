import { useStores } from '@app/index'
import PageLoader from '@shared/ui/loaders/PageLoader'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { renderContent } from '../shared/lib/renderContent'

const Project = () => {
	const { id } = useParams()

	const { projectStore } = useStores()

	useEffect(() => {
		if (id) projectStore.getProject(id)
	}, [id])
	// FIXME: пофиксить лоадер
	return (
		<div>
			{projectStore.loading ? (
				<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-bold text-2xl'>
					<PageLoader />
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
}

export default observer(Project)
