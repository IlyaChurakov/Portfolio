import { observer } from 'mobx-react-lite'
import { FC, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
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
					{projectStore?.projectList.map(project => {
						return (
							<Link to={project.id} key={project.id} className='aspect-square'>
								<div className='w-full h-full bg-gray-300 rounded-t-lg'></div>
								<div className='bg-white p-2 rounded-b-lg'>{project.name}</div>
							</Link>
						)
					})}
				</div>
				<button
					onClick={projectStore.deleteAllProjects}
					className='w-full mb-5 text-red-500 m-auto bg-white rounded-sm px-2 py-1 hover:text-white hover:bg-red-500'
				>
					delete all projects
				</button>
			</Container>
		</section>
	)
}

export default observer(ProjectList)
