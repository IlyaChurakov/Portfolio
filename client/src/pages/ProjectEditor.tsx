import Content from '@entities/Content'
import { observer } from 'mobx-react-lite'
import NavPageMap from '../widgets/NavPageMap'

const ProjectEditor = () => {
	return (
		<>
			<Content />
			<NavPageMap />
		</>
	)
}

export default observer(ProjectEditor)
