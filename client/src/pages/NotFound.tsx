import CustomLink from '@shared/ui/CustomLink'
import Subtitle from '@widgets/blocks/Subtitle'
import Title from '@widgets/blocks/Title'
import { FC } from 'react'

const NotFound: FC = () => {
	return (
		<div className='absolute flex flex-col items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
			<Title text='404' color='#9255E8' />
			<Subtitle text='Страница не найдена' />
			<CustomLink
				to='/'
				text='Вернуться на главную'
				className='my-5'
				color='text-violet'
			/>
		</div>
	)
}

export default NotFound
