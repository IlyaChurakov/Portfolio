import Centered from '@shared/ui/Centered'
import CustomLink from '@shared/ui/CustomLink'
import Subtitle from '@shared/ui/Subtitle'
import Title from '@shared/ui/Title'

const NotFound = () => {
	return (
		<Centered>
			<Title text='404' color='#9255E8' />
			<Subtitle text='Страница не найдена' />
			<CustomLink
				to='/'
				text='Вернуться на главную'
				className='my-5'
				color='text-violet'
			/>
		</Centered>
	)
}

export default NotFound
