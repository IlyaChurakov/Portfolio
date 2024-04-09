import { useStores } from '@app/index'
import CustomLink from '@shared/ui/CustomLink'
import { observer } from 'mobx-react-lite'
import Container from '../shared/layouts/Container'

const Footer = () => {
	const { authStore } = useStores()

	return (
		<footer className='max-h-[200px] w-full h-full p-10 bg-gray-dark'>
			<Container>
				<div className='grid grid-rows-3 grid-flow-col w-min gap-x-[100px] text-gray'>
					<CustomLink to='/' text='Главная' />

					{authStore.isAuth ? (
						<CustomLink to='/profile' text='Профиль' />
					) : (
						<CustomLink to='/login' text='Вход в аккаунт' />
					)}

					<CustomLink to='/projects' text='Проекты' />
				</div>
			</Container>
		</footer>
	)
}

export default observer(Footer)
