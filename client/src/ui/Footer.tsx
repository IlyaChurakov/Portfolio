import { FC } from 'react'
import { Link } from 'react-router-dom'
import Container from '../layouts/Container'

const Footer: FC = () => {
	return (
		<footer className=' max-h-[200px] w-full h-full p-10 bg-[#595961]'>
			<Container>
				<div className='w-full text-white columns-2'>
					<Link
						className='w-[100px] break-inside-avoid-column hover:underline'
						to={'/'}
					>
						Главная
					</Link>
					<Link
						className='w-[100px] break-inside-avoid-column hover:underline'
						to={'/profile'}
					>
						Профиль
					</Link>
					<Link
						className='w-[100px] break-inside-avoid-column hover:underline'
						to={'/projects'}
					>
						Проекты
					</Link>
				</div>
			</Container>
		</footer>
	)
}

export default Footer
