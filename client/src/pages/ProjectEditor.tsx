import { useStores } from '@app/index'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { renderContent } from '../shared/lib/renderContent'
import NavPageMap from '../widgets/NavPageMap'

const ProjectEditor = observer(() => {
	const { projectStore } = useStores()
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

export default ProjectEditor
