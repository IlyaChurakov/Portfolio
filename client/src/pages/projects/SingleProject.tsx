import { observer } from 'mobx-react-lite'
import { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Context } from '../../main'
import { renderContent } from './utils/renderContent'

export const SingleProject = observer(() => {
	const { id } = useParams()
	const { projectStore, store } = useContext(Context)

	useEffect(() => {
		projectStore.getProject(id as string)
	}, [id])

	return (
		<div>
			<div>{renderContent(projectStore?.project?.content)}</div>
		</div>
	)
})
