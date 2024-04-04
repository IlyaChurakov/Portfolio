import Projects from '@widgets/ProjectList'
import { observer } from 'mobx-react-lite'
import Container from '../shared/layouts/Container'

const ProjectList = () => {
	return (
		<section>
			<Container>
				<Projects />
			</Container>
		</section>
	)
}

export default observer(ProjectList)
