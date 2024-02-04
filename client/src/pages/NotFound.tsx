import { FC } from 'react'
import { Link } from 'react-router-dom'

export const NotFound: FC = () => {
	return (
		<div className='absolute flex flex-col items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
			<h1 className='text-white font-bold text-3xl mb-5'>Page not found</h1>
			<Link to={'/'} className='text-violet hover:brightness-75'>
				Вернуться на главную
			</Link>
		</div>
	)
}
