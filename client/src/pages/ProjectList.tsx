import Projects from '@widgets/ProjectList'
import { observer } from 'mobx-react-lite'
import { FC } from 'react'
import Container from '../shared/layouts/Container'

const ProjectList: FC = observer(() => {
	return (
		<section>
			<Container>
				<Projects />
			</Container>
		</section>
	)
})

export default ProjectList
