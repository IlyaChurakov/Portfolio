import { useStores } from '@app/index'
import { pageTypes } from '@pages/types'
import { appRoles } from '@shared/config/router/router.config'
import Container from '@shared/layouts/Container'
import { observer } from 'mobx-react-lite'
import { GoArrowLeft } from 'react-icons/go'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'

const Header = () => {
	const { id } = useParams()
	const navigate = useNavigate()
	const { pathname } = useLocation()
	const { projectStore, authStore, userStore } = useStores()

	const isAdmin =
		authStore.isUserLogged && userStore.user.role === appRoles.ADMIN

	const isProjectsPage = pathname == '/projects'
	const isSkillsPage = pathname == '/skills'
	const isProjectPage = pathname.includes('/projects/')
	const isSkillPage = pathname.includes('/skills/')

	const addProject = async (e: React.SyntheticEvent) => {
		e.preventDefault()

		const name = prompt('Введите имя проекта:')
		if (!name) return

		const project = await projectStore.createProject(name, pageTypes.project)
		if (!project) return

		navigate(`/editor/${project.id}`)
	}

	const leave = () => {
		if (isProjectsPage || isSkillsPage) {
			navigate('/')
			return
		}
		if (isSkillPage) {
			navigate('/skills')
			return
		}
		if (isProjectPage) {
			navigate('/projects')
			return
		}

		if (!projectStore.saved) {
			alert('Проект не сохранен')
			return
		}
		if (projectStore.project.type === pageTypes.project) {
			navigate(`/projects/${id}`)
			return
		}
		if (projectStore.project.type === pageTypes.skill) {
			navigate(`/skills/${id}`)
			return
		}
	}

	const editButtonText = isProjectPage
		? 'Редактировать проект'
		: isSkillPage && 'Редактировать навык'

	const addButtonText = isProjectsPage
		? 'Добавить проект'
		: isSkillsPage && 'Добавить навык'

	return (
		<section className='bg-gray-dark p-5 text-sm'>
			<Container>
				<div className='flex'>
					<GoArrowLeft
						className='text-xl cursor-pointer text-gray hover:text-white mr-5'
						onClick={leave}
					/>

					{isAdmin && !id && (
						<Link
							to={'/projects/new'}
							className='mr-5 text-gray hover:text-white'
							onClick={e => addProject(e)}
						>
							{addButtonText}
						</Link>
					)}

					{isAdmin && id && (
						<Link
							to={`/editor/${id}`}
							className='mr-5 text-gray hover:text-white'
						>
							{editButtonText}
						</Link>
					)}
				</div>
			</Container>
		</section>
	)
}

export default observer(Header)
