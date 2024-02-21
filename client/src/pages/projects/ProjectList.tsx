import { RootStore } from '@app/provider/store/rootStore'
import { RootStoreContext, useStores } from '@app/provider/store/store'
import { observer } from 'mobx-react-lite'
import { FC, useEffect } from 'react'
import Container from '../../shared/layouts/Container'
import ProjectItem from '../../shared/ui/ProjectItem'

export const ProjectList: FC = observer(() => {
	const { getProjectList, projectList } = useStores(
		RootStoreContext,
		(contextData: RootStore) => contextData,
		(store: RootStore) => store.projectStore
	)

	useEffect(() => {
		getProjectList()
	}, [])

	return (
		<section>
			<Container>
				<div className='w-full py-10 grid grid-cols-4 gap-5'>
					{projectList.map(project => (
						<ProjectItem key={project.id} project={project} />
					))}
				</div>
			</Container>
		</section>
	)
})
