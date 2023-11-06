import { FC } from 'react'
import { Link, Outlet, useLocation, useParams } from 'react-router-dom'
import Container from '../../layouts/Container'

const Projects: FC = () => {
	const { pathname } = useLocation()
	const { id } = useParams()

	return (
		<div>
			{pathname !== '/projects/new' && (
				<section className='bg-[#595961] py-2 px-5'>
					<Container>
						{pathname.indexOf('new') == -1 && (
							<Link
								to={'/projects/new'}
								className='mr-5 text-[#A7ACB0]  hover:text-white'
							>
								Добавить проект
							</Link>
						)}
						{id && (
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
