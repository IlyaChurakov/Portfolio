import { FC, useContext } from 'react'
import { Link } from 'react-router-dom'
import Container from '../layouts/Container'
import { Context } from '../main'

const Footer: FC = () => {
	const { store } = useContext(Context)

	return (
		<footer className=' max-h-[200px] w-full h-full p-10 bg-[#232426]'>
			<Container>
				<div className='w-full text-[#6F7680] flex flex-col'>
					<Link className=' hover:text-white' to={'/'}>
						Главная
					</Link>
					{store.isAuth ? (
						<Link className=' hover:text-white' to={'/profile'}>
							Профиль
						</Link>
					) : (
						<Link className=' hover:text-white' to={'/login'}>
							Вход в аккаунт
						</Link>
					)}

					<Link className=' hover:text-white' to={'/projects'}>
						Проекты
					</Link>
				</div>
			</Container>
		</footer>
	)
}

export default Footer
