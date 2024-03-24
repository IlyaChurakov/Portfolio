import { useStores } from '@app/index'
import CustomLink from '@shared/ui/CustomLink'
import { observer } from 'mobx-react-lite'
import { FC } from 'react'
import Container from '../shared/layouts/Container'

const Footer: FC = () => {
	const { authStore } = useStores()

	return (
		<footer className='max-h-[200px] w-full h-full p-10 bg-gray-dark'>
			<Container>
				<div className='grid grid-rows-3 grid-flow-col w-min gap-x-[100px]'>
					<CustomLink
						to='/'
						text='Главная'
						className='my-0'
						color='text-gray'
					/>

					{authStore.isAuth ? (
						<CustomLink
							to='/profile'
							text='Профиль'
							className='my-0'
							color='text-gray'
						/>
					) : (
						<CustomLink
							to='/login'
							text='Вход в аккаунт'
							className='my-0'
							color='text-gray'
						/>
					)}

					<CustomLink
						to='/projects'
						text='Проекты'
						className='my-0'
						color='text-gray'
					/>
				</div>
			</Container>
		</footer>
	)
}

export default observer(Footer)
