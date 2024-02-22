import { useStores } from '@app/provider'
import { RootStore } from '@app/provider/store/rootStore'
import { RootStoreContext } from '@app/provider/store/store'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { renderContent } from '../utils/renderContent'
import NavPageMap from './components/NavPageMap'

const EditProject = observer(() => {
	const projectStore = useStores(
		RootStoreContext,
		(contextData: RootStore) => contextData,
		(store: RootStore) => store.projectStore
	)
	const { id } = useParams()

	useEffect(() => {
		if (id) {
			projectStore.getProject(id)
		}
	}, [])

	return (
		<div>
			<div>{renderContent(projectStore.project)}</div>
			<NavPageMap />
		</div>
	)
})

export default EditProject
