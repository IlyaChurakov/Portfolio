import { useStores } from '@app/provider/store/store'
import { observer } from 'mobx-react-lite'
import { FC, useEffect } from 'react'
import Container from '../../shared/layouts/Container'
import ProjectItem from '../../shared/ui/ProjectItem'

const ProjectList: FC = observer(() => {
	const { projectStore } = useStores()

	useEffect(() => {
		projectStore.getProjectList()
	}, [])

	return (
		<section>
			<Container>
				<div className='w-full py-10 grid grid-cols-4 gap-5'>
					{projectStore.projectList.map(project => (
						<ProjectItem key={project.id} project={project} />
					))}
				</div>
			</Container>
		</section>
	)
})

export default ProjectList
