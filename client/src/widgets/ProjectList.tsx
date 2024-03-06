import { useStores } from '@app/index'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import ProjectItem from './ProjectItem'

const ProjectList = ({ count }: { count?: number }) => {
	const { projectStore } = useStores()

	useEffect(() => {
		projectStore.getProjectList(count)
	}, [])

	return (
		<div className='grid grid-cols-4 gap-5 justify-items-center'>
			{projectStore.projectList?.map(project => (
				<ProjectItem key={project.id} project={project} />
			))}
		</div>
	)
}

export default observer(ProjectList)
