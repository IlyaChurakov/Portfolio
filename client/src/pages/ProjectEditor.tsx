import { useStores } from '@app/index'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Content } from '../entities/Content'
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
			<Content project={projectStore.project} />
			<NavPageMap />
		</div>
	)
})

export default ProjectEditor
