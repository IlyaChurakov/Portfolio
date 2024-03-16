import { useStores } from '@app/index'
import { observer } from 'mobx-react-lite'
import { TiArrowSync } from 'react-icons/ti'

const ProjectSavingButton = () => {
	const { projectStore, errorStore } = useStores()

	const saveProject = async () => {
		try {
			await projectStore.saveProject()
		} catch (err) {
			errorStore.add('Не удалось сохранить проект')
		}
	}

	return (
		<button
			onClick={saveProject}
			className='mr-5 py-2 flex justify-center items-center w-full text-white'
			style={{
				background: projectStore.saved ? 'rgb(0, 178, 23)' : '#C24D51',
			}}
		>
			{projectStore.saved ? 'Сохранено' : 'Сохранить'}
			{projectStore.loading && <TiArrowSync className='text-gray ml-2' />}
		</button>
	)
}

export default observer(ProjectSavingButton)
