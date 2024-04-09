import CustomLink from '@shared/ui/CustomLink'
import Title from '@shared/ui/Title'
import ProjectList from '@widgets/ProjectList'
import Contact from '@widgets/blocks/Contact'
import Promo from '@widgets/blocks/Promo'
import Container from '../shared/layouts/Container'

const Home = () => {
	return (
		<Container>
			<Promo />

			<section>
				<Title text='Проекты' />
				<ProjectList count={4} />
				<CustomLink
					to='/projects'
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
