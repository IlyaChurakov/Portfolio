import { observer } from 'mobx-react-lite'
import { FC, useContext, useEffect } from 'react'
import { Context } from '../../main'
import Container from '../../shared/layouts/Container'
import ProjectItem from '../../shared/ui/ProjectItem'

export const ProjectList: FC = observer(() => {
	const { projectStore } = useContext(Context)

	useEffect(() => {
		projectStore.getProjectList()
	}, [])

	return (
		<section>
			<Container>
				<div className='w-full py-10 grid grid-cols-4 gap-5'>
					{projectStore?.projectList.map(project => (
						<ProjectItem key={project.id} project={project} />
					))}
				</div>
			</Container>
		</section>
	)
})
