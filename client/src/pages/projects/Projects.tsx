import { FC, useContext } from 'react'
import { GoArrowLeft } from 'react-icons/go'
import {
	Link,
	Outlet,
	useLocation,
	useNavigate,
	useParams,
} from 'react-router-dom'
import Container from '../../layouts/Container'
import { Context } from '../../main'

// TODO: проверка защиты роутов, убрать кнопки у неавторизованных пользователей и пользователей без админки

const Projects: FC = () => {
	const { pathname } = useLocation()
	const { id } = useParams()
	const { projectStore, store } = useContext(Context)
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
				<section className='bg-gray-dark p-5 text-sm'>
					<Container>
						<div className='flex'>
							<GoArrowLeft
								className='text-xl cursor-pointer text-gray hover:text-white mr-5'
								onClick={() => {
									if (pathname.includes('/edit')) {
										if (!projectStore.saved) {
											alert('Проект не сохранен')
										} else {
											navigate(pathname.split('/edit')[0])
										}
									} else {
										navigate(
											pathname.includes('/projects/') ? '/projects' : '/'
										)
									}
								}}
							/>
							{store.isAuth &&
								store.user.roles?.includes('admin') &&
								!pathname.includes('/new') && (
									<Link
										to={'/projects/new'}
										className='mr-5 text-gray hover:text-white'
										onClick={e => addProject(e)}
									>
										Добавить проект
									</Link>
								)}
							{store.isAuth &&
								store.user.roles?.includes('admin') &&
								!pathname.includes('/edit') &&
								id && (
									<Link
										to={`/projects/${id}/edit`}
										className='mr-5 text-gray hover:text-white'
									>
										Редактировать проект
									</Link>
								)}
						</div>
					</Container>
				</section>
			)}

			<Outlet />
		</div>
	)
}

export default Projects
