import { useStores } from '@app/index'
import { observer } from 'mobx-react-lite'
import ReactLoading from 'react-loading'

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
			className='py-2 flex justify-center items-center w-full text-white hover:opacity-75'
			style={{
				background: projectStore.saved ? 'rgb(0, 178, 23)' : '#C24D51',
			}}
		>
			{projectStore.loading ? (
				<ReactLoading type='spin' width={25} height={25} color={'white'} />
			) : projectStore.saved ? (
				'Сохранено'
			) : (
				'Сохранить'
			)}
		</button>
	)
}

export default observer(ProjectSavingButton)
