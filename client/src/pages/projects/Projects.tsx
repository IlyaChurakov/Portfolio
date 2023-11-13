import { FC, useContext } from 'react'
import {
	Link,
	Outlet,
	useLocation,
	useNavigate,
	useParams,
} from 'react-router-dom'
import Container from '../../layouts/Container'
import { Context } from '../../main'

const Projects: FC = () => {
	const { pathname } = useLocation()
	const { id } = useParams()
	const { projectStore } = useContext(Context)
	const navigate = useNavigate()

	const addProject = async (e: React.SyntheticEvent) => {
		e.preventDefault()

		const name = prompt('Введите имя проекта:')

		if (name) {
			const project = await projectStore.createProject(name)

			if (project) {
				navigate(`/projects/${project.id}/edit`)
			}
		} else {
			console.log('not name')
		}
	}

	return (
		<div>
			{pathname !== '/projects/new' && (
				<section className='bg-[#595961] py-2 px-5'>
					<Container>
						{!pathname.includes('/new') && (
							<Link
								to={'/projects/new'}
								className='mr-5 text-[#A7ACB0]  hover:text-white'
								onClick={e => addProject(e)}
							>
								Добавить проект
							</Link>
						)}
						{!pathname.includes('/edit') && id && (
							<Link
								to={`/projects/${id}/edit`}
								className='mr-5 text-[#A7ACB0]  hover:text-white'
							>
								Редактировать проект
							</Link>
						)}
					</Container>
				</section>
			)}

			<Outlet />
		</div>
	)
}

export default Projects
