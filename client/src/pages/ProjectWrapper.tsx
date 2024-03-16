import { useStores } from '@app/index'
import { observer } from 'mobx-react-lite'
import { GoArrowLeft } from 'react-icons/go'
import {
	Link,
	Outlet,
	useLocation,
	useNavigate,
	useParams,
} from 'react-router-dom'
import Container from '../shared/layouts/Container'

const ProjectWrapper = () => {
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
							{/* {authStore.isAuth &&
								userStore.user.roles?.includes('admin') &&
								pathname.includes('/edit') && <ProjectSavingButton />} */}
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
}

export default observer(ProjectWrapper)
