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

	const leave = () => {
		if (pathname.includes('/edit')) {
			if (!projectStore.saved) {
				alert('Проект не сохранен')
			} else {
				navigate(pathname.split('/edit')[0])
			}
		} else {
			navigate(pathname.includes('/projects/') ? '/projects' : '/')
		}
	}

	const isAdminOnProjectListPage =
		authStore.isAuth &&
		userStore.user.roles?.includes('admin') &&
		pathname == '/projects'

	const isAdminOnProjectPage =
		authStore.isAuth &&
		userStore.user.roles?.includes('admin') &&
		!pathname.includes('/edit')

	return (
		<>
			<section className='bg-gray-dark p-5 text-sm'>
				<Container>
					<div className='flex'>
						<GoArrowLeft
							className='text-xl cursor-pointer text-violet hover:text-white mr-5'
							onClick={leave}
						/>

						{isAdminOnProjectListPage && (
							<Link
								to={'/projects/new'}
								className='mr-5 text-violet hover:text-white'
								onClick={e => addProject(e)}
							>
								Добавить проект
							</Link>
						)}

						{isAdminOnProjectPage && id && (
							<Link
								to={`/projects/${id}/edit`}
								className='mr-5 text-violet hover:text-white'
							>
								Редактировать проект
							</Link>
						)}
					</div>
				</Container>
			</section>

			<Outlet />
		</>
	)
}

export default observer(ProjectWrapper)
