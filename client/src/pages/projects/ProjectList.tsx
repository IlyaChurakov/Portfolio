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
							<Link
								to={project.id}
								key={project.id}
								className='aspect-square relative'
							>
								{project.previewImage ? (
									<img
										src={`http://localhost:7001/${project.previewImage}`}
										alt='avatar'
										className='w-full h-full object-cover rounded-lg hover:opacity-70'
									/>
								) : (
									<div className='w-full h-full bg-gray rounded-lg'></div>
								)}

								<div className='p-2 rounded-b-lg absolute left-2 bottom-2 text-white'>
									{project.name}
								</div>
							</Link>
						)
					})}
				</div>
			</Container>
		</section>
	)
}

export default observer(ProjectList)
