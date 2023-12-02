import { observer } from 'mobx-react-lite'
import { FC, useContext, useEffect } from 'react'
import ProjectItem from '../../components/ProjectItem'
import Container from '../../layouts/Container'
import { Context } from '../../main'

const ProjectList: FC = () => {
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
}

export default observer(ProjectList)
