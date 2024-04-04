import Contact from '@widgets/blocks/Contact'
import Projects from '@widgets/blocks/Projects'
import Promo from '@widgets/blocks/Promo'
import Container from '../shared/layouts/Container'

const Home = () => {
	return (
		<Container>
			<Promo />

			<Projects />

			<Contact />
		</Container>
	)
}

export default Home
