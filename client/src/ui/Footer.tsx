import { FC } from 'react'
import { Link } from 'react-router-dom'
import Container from '../layouts/Container'

const Footer: FC = () => {
	return (
		<footer className=' max-h-[200px] w-full h-full p-10 bg-[#232426]'>
			<Container>
				<div className='w-full text-[#6F7680] flex flex-col'>
					<Link className='w-[100px] hover:text-white' to={'/'}>
						Главная
					</Link>
					<Link className='w-[100px] hover:text-white' to={'/profile'}>
						Профиль
					</Link>
					<Link className='w-[100px] hover:text-white' to={'/projects'}>
						Проекты
					</Link>
				</div>
			</Container>
		</footer>
	)
}

export default Footer
