import CustomLink from '@shared/ui/CustomLink'
import Title from '@shared/ui/Title'
import ProjectList from '@widgets/ProjectList'
import Contact from '@widgets/blocks/Contact'
import Promo from '@widgets/blocks/Promo'
import Container from '../shared/layouts/Container'
import { pageTypes } from './types'

const Home = () => {
	return (
		<Container>
			<Promo />

			<section>
				<Title text='Проекты' />
				<ProjectList count={4} type={pageTypes.project} />
				<CustomLink
					to='/projects'
					text='Смотреть все'
					position='right'
					className='my-5'
					color='text-gray'
				/>
			</section>

			<section>
				<Title text='Стек' />
				<ProjectList count={4} type={pageTypes.skill} />
				<CustomLink
					to='/skills'
					text='Смотреть все'
					position='right'
					className='my-5'
					color='text-gray'
				/>
			</section>

			<Contact />
		</Container>
	)
}

export default Home
