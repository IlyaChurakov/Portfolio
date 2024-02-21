import { RootStore } from '@app/provider/store/rootStore'
import { RootStoreContext, useStores } from '@app/provider/store/store'
import { observer } from 'mobx-react-lite'
import { FC } from 'react'
import { GoArrowLeft } from 'react-icons/go'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import Container from '../../shared/layouts/Container'

export const Profile: FC = observer(() => {
	const { user } = useStores(
		RootStoreContext,
		(contextData: RootStore) => contextData,
		(store: RootStore) => store.authStore
	)
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

						{user.roles.includes('admin') && (
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
