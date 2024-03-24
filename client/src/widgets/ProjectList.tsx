import { useStores } from '@app/index'
import { AppRoles } from '@shared/config/router/types'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import ProjectItem from './ProjectItem'

const ProjectList = ({ count }: { count?: number }) => {
	const { projectStore, userStore } = useStores()

	useEffect(() => {
		projectStore.getProjectList(count)
	}, [])

	return (
		<div className='grid grid-cols-4 gap-5 justify-items-center'>
			{projectStore.projectList?.map(project => {
				if (project.archived && !userStore.user.roles?.includes(AppRoles.ADMIN))
					return
				return (
					<ProjectItem
						key={project.id}
						project={project}
						archived={!!project.archived}
					/>
				)
			})}
		</div>
	)
}

export default observer(ProjectList)
