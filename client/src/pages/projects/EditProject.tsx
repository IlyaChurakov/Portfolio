import { observer } from 'mobx-react-lite'
import { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Context } from '../../main'
import NavPageMap from './components/NavPageMap'
import { renderContent } from './utils/renderContent'

export const EditProject = observer(() => {
	const { projectStore } = useContext(Context)
	const { id } = useParams()

	useEffect(() => {
		if (id) {
			projectStore.getProject(id)
		}
	}, [])

	return (
		<div>
			<div>{renderContent(projectStore.project)}</div>
			<NavPageMap />
		</div>
	)
})
