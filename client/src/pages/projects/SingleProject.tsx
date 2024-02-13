import { observer } from 'mobx-react-lite'
import { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Context } from '../../main'
import { renderContent } from './utils/renderContent'

export const SingleProject = observer(() => {
	const { id } = useParams()
	const { projectStore } = useContext(Context)

	useEffect(() => {
		projectStore.getProject(id as string)
	}, [id])

	return (
		<div>
			{projectStore.loading ? (
				<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-bold text-2xl'>
					Загрузка
				</div>
			) : (
				<div>{renderContent(projectStore.project)}</div>
			)}
		</div>
	)
})
