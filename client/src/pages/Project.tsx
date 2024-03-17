import { useStores } from '@app/index'
import PageLoader from '@shared/ui/PageLoader'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Content } from '../entities/Content'

const Project = () => {
	const { id } = useParams()
	const { projectStore } = useStores()
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
			{projectStore.loading ? (
				<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-bold text-2xl'>
					<PageLoader />
				</div>
			) : (
				<div>
					{projectStore.project && <Content project={projectStore.project} />}
				</div>
			)}
		</div>
	)
}

export default observer(Project)
