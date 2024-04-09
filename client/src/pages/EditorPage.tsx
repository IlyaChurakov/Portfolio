import Content from '@entities/Content'
import Header from '@widgets/Header'
import { observer } from 'mobx-react-lite'
import Editor from '../widgets/editor/Editor'

const EditorPage = () => {
	return (
		<>
			<Header />
			<Content />
			<Editor />
		</>
	)
}

export default observer(EditorPage)
