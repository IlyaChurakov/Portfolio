import { useStores } from '@app/index'
import CustomLink from '@shared/ui/CustomLink'
import { observer } from 'mobx-react-lite'
import { GoArrowLeft } from 'react-icons/go'
import { Link, Outlet } from 'react-router-dom'
import Container from '../shared/layouts/Container'

const ProfileWrapper = () => {
	const { userStore } = useStores()

	const isAdmin = userStore.user.roles?.includes('admin')

	return (
		<>
			<section className='p-5 text-sm'>
				<Container>
					<div className='flex items-center'>
						<Link to='/'>
							<GoArrowLeft className='text-xl cursor-pointer text-gray hover:text-white mr-5' />
						</Link>

						<CustomLink
							to='/profile'
							text='Профиль'
							className='mr-5'
							color='text-gray'
						/>

						{isAdmin && (
							<CustomLink
								to='users'
								text='Список пользователей'
								color='text-gray'
							/>
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
}

export default observer(ProfileWrapper)
