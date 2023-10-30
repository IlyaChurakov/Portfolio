import { FC } from 'react'
import { Link } from 'react-router-dom'
import Container from '../layouts/Container'

const Footer: FC = () => {
	return (
		<footer className='w-full h-full p-10 bg-gray-600'>
			<Container>
				<ul className='w-1/4 text-white'>
					<li>
						<Link className='hover:underline' to={'/'}>
							Главная
						</Link>
					</li>
					<li>
						<Link className='hover:underline' to={'/profile'}>
							Профиль
						</Link>
					</li>
				</ul>
			</Container>
		</footer>
	)
}

export default Footer
