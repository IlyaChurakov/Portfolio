import { observer } from 'mobx-react-lite'
import { FC, useContext } from 'react'
import { Link, Outlet } from 'react-router-dom'
import Container from '../../layouts/Container'
import { Context } from '../../main'

const Profile: FC = () => {
	const { store } = useContext(Context)

	return (
		<>
			<section className='bg-[#595961] p-2'>
				<Container>
					<Link
						to={'/profile'}
						className='mr-5 text-[#A7ACB0]  hover:text-white'
					>
						Профиль
					</Link>
					{store.user.roles.includes('admin') && (
						<Link to={'users'} className='mr-5 text-[#A7ACB0] hover:text-white'>
							Список пользователей
						</Link>
					)}
				</Container>
			</section>
			<section>
				<Container>
					<Outlet />
				</Container>
			</section>
		</>
	)
}

export default observer(Profile)
