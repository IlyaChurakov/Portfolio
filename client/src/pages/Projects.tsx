import ProjectList from '@widgets/ProjectList'
import { observer } from 'mobx-react-lite'
import Container from '../shared/layouts/Container'

const type = 'Проект'

const Projects = () => {
	return (
		<section>
			<Container>
				<ProjectList type={type} />
			</Container>
		</section>
	)
}

export default observer(Projects)
