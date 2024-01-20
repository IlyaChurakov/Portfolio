import { FC, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../../main'
import Container from '../layouts/Container'

const Footer: FC = () => {
	const { store } = useContext(Context)

	return (
		<footer className=' max-h-[200px] w-full h-full p-10 bg-[#232426]'>
			<Container>
				<div className='flex flex-col text-[#6F7680]'>
					<div>
						<Link className='hover:text-white inline-block w-auto' to={'/'}>
							Главная
						</Link>
					</div>

					{store.isAuth ? (
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
