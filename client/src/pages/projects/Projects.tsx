import { useStores } from '@app/provider'
import { observer } from 'mobx-react-lite'
import { FC } from 'react'
import { GoArrowLeft } from 'react-icons/go'
import { TiArrowSync } from 'react-icons/ti'
import {
	Link,
	Outlet,
	useLocation,
	useNavigate,
	useParams,
} from 'react-router-dom'
import Container from '../../shared/layouts/Container'

const Projects: FC = observer(() => {
	const { pathname } = useLocation()
	const { id } = useParams()

	const { projectStore, authStore, userStore } = useStores()

	const navigate = useNavigate()

	const addProject = async (e: React.SyntheticEvent) => {
		e.preventDefault()

		const name = prompt('Введите имя проекта:')
		if (!name) return

		const project = await projectStore.createProject(name)
		if (!project) return

		navigate(`/projects/${project.id}/edit`)
	}

	const saveProject = async () => {
		await projectStore.saveProject()
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
							{authStore.isAuth &&
								userStore.user.roles?.includes('admin') &&
								pathname == '/projects' && (
									<Link
										to={'/projects/new'}
										className='mr-5 text-gray hover:text-white'
										onClick={e => addProject(e)}
									>
										Добавить проект
									</Link>
								)}
							{authStore.isAuth &&
								userStore.user.roles?.includes('admin') &&
								pathname.includes('/edit') && (
									<button
										onClick={saveProject}
										className='mr-5 flex items-center'
										style={{
											color: projectStore.saved ? 'rgb(0, 178, 23)' : '#C24D51',
										}}
									>
										{projectStore.saved ? 'Сохранено' : 'Сохранить'}
										{projectStore.loading && (
											<TiArrowSync className='text-gray ml-2' />
										)}
									</button>
								)}
							{authStore.isAuth &&
								userStore.user.roles?.includes('admin') &&
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
})

export default Projects
