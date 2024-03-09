import { FC } from 'react'
import { Link } from 'react-router-dom'

const NotFound: FC = () => {
	return (
		<div className='absolute flex flex-col items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
			<h1 className='text-violet font-bold text-5xl mb-5'>404</h1>
			<h2 className='text-white font-bold text-3xl mb-5'>
				Страница не найдена
			</h2>
			<Link to={'/'} className='text-violet hover:brightness-75'>
				Вернуться на главную
			</Link>
		</div>
	)
}

export default NotFound
