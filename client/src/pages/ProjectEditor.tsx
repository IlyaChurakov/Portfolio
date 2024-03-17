import { useStores } from '@app/index'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Content } from '../entities/Content'
import NavPageMap from '../widgets/NavPageMap'

const ProjectEditor = observer(() => {
	const { projectStore } = useStores()
	const { id } = useParams()
	const navigate = useNavigate()

	useEffect(() => {
		getProject(id)
	}, [id])

	async function getProject(id: string | null | undefined) {
		if (!id) return

		const project = await projectStore.getProject(id)
		if (!project) navigate('/not-found')
	}

	return (
		<div>
			<Content project={projectStore.project} />
			<NavPageMap />
		</div>
	)
})

export default ProjectEditor
