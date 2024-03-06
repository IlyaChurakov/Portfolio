import { useStores } from '@app/index'
import { observer } from 'mobx-react-lite'
import { FC } from 'react'
import { GoArrowLeft } from 'react-icons/go'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import Container from '../../shared/layouts/Container'

const Profile: FC = observer(() => {
	const { userStore } = useStores()
	const navigate = useNavigate()

	return (
		<>
			<section className='bg-gray-dark p-5 text-sm'>
				<Container>
					<div className='flex'>
						<GoArrowLeft
							className='text-xl cursor-pointer text-gray hover:text-white mr-5'
							onClick={() => {
								navigate('/')
							}}
						/>

						<Link to={'/profile'} className='mr-5 text-gray  hover:text-white'>
							Профиль
						</Link>

						{userStore.user.roles?.includes('admin') && (
							<Link to={'users'} className='mr-5 text-gray hover:text-white'>
								Список пользователей
							</Link>
						)}
					</div>
				</Container>
			</section>

			<section>
				<Container>
					<Outlet />
				</Container>
			</section>
		</>
	)
})

export default Profile
