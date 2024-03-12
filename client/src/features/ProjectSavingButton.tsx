import { useStores } from '@app/index'
import { observer } from 'mobx-react-lite'
import { TiArrowSync } from 'react-icons/ti'

const ProjectSavingButton = () => {
	const { projectStore } = useStores()

	const saveProject = async () => {
		await projectStore.saveProject()
	}

	return (
		<button
			onClick={saveProject}
			className='mr-5 flex items-center'
			style={{
				color: projectStore.saved ? 'rgb(0, 178, 23)' : '#C24D51',
			}}
		>
			{projectStore.saved ? 'Сохранено' : 'Сохранить'}
			{projectStore.loading && <TiArrowSync className='text-gray ml-2' />}
		</button>
	)
}

export default observer(ProjectSavingButton)
