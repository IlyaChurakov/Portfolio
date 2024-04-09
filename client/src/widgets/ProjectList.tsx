import { useStores } from '@app/index'
import { IProject } from '@app/store/projectStore/types/project.types'
import { AppRoles } from '@shared/config/router/types'
import Loader from '@shared/ui/Loader'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { PiImageSquareFill } from 'react-icons/pi'
import { Link } from 'react-router-dom'

const ProjectList = ({ count, type }: { count?: number; type?: string }) => {
	const { userStore, projectStore } = useStores()
	const user = userStore.user

	useEffect(() => {
		projectStore.getProjectList(count, type)
	}, [])

	const isLoaded = projectStore.projectList
	if (!isLoaded) return <Loader />

	const isFilled = !!projectStore.projectList?.length
	const columns = isFilled ? 'grid-cols-4' : 'grid-cols-1'
	const isAdmin = user.roles?.includes(AppRoles.ADMIN)

	const content = projectStore.projectList?.map(project =>
		project.archived && !isAdmin ? null : (
			<ProjectItem
				key={project.id}
				project={project}
				archived={!!project.archived}
			/>
		)
	)

	return (
		<div className={`grid ${columns} gap-5 justify-items-center`}>
			{isFilled ? content : <Empty text='Проектов еще нет...' />}
		</div>
	)
}

const ProjectItem = ({
	project,
	archived,
}: {
	project: IProject
	archived: boolean
}) => {
	const brightness = archived ? 'brightness-[20%]' : 'brightness-50'
	const staticPath = import.meta.env.VITE_API_STATIC_URL + '/'
	const url = project.previewImage && staticPath + project.previewImage

	return (
		<Link
			to={project.id}
			className={`w-full bg-gray aspect-square flex justify-center items-center relative rounded-lg`}
		>
			{url ? (
				<img
					src={url}
					alt='project'
					className={`h-full w-full object-cover rounded-lg ${brightness}`}
				/>
			) : (
				<div className='w-full h-full bg-gray rounded-lg flex items-center justify-center brightness-50'>
					<PiImageSquareFill className='text-7xl text-black' />
				</div>
			)}

			{archived && (
				<h2 className='text-3xl font-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-red'>
					Архив
				</h2>
			)}

			<span className='absolute bottom-5 left-5 text-white'>
				{project.name}
			</span>
		</Link>
	)
}

function Empty({ text }: { text: string }) {
	return (
		<div className='w-full h-20 flex justify-center items-center text-white border-[1px] border-violet rounded-xl'>
			{text}
		</div>
	)
}

export default observer(ProjectList)
