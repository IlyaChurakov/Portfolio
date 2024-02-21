import { useStores } from '@app/provider'
import { RootStore } from '@app/provider/store/rootStore'
import { RootStoreContext } from '@app/provider/store/store'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import Container from '../layouts/Container'

const Footer: FC = () => {
	const userStore = useStores(
		RootStoreContext,
		(contextData: RootStore) => contextData,
		(store: RootStore) => store.userStore
	)

	return (
		<footer className=' max-h-[200px] w-full h-full p-10 bg-[#232426]'>
			<Container>
				<div className='flex flex-col text-[#6F7680]'>
					<div>
						<Link className='hover:text-white inline-block w-auto' to={'/'}>
							Главная
						</Link>
					</div>

					{userStore.isAuth ? (
						<div>
							<Link className=' hover:text-white inline-block' to={'/profile'}>
								Профиль
							</Link>
						</div>
					) : (
						<div>
							<Link className=' hover:text-white inline-block' to={'/login'}>
								Вход в аккаунт
							</Link>
						</div>
					)}
					<div>
						<Link className=' hover:text-white inline-block' to={'/projects'}>
							Проекты
						</Link>
					</div>
				</div>
			</Container>
		</footer>
	)
}

export default Footer
