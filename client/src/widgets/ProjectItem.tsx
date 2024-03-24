import { IProject } from '@app/store/projectStore/types/project.types'
import React from 'react'
import { PiImageSquareFill } from 'react-icons/pi'
import { Link } from 'react-router-dom'

interface IProjectItemProps {
	project: IProject
	archived: boolean
}

const ProjectItem: React.FC<IProjectItemProps> = ({ project, archived }) => {
	console.log(archived)
	return (
		<Link
			to={`/projects/${project.id}`}
			className={`w-full bg-gray aspect-square flex justify-center items-center relative rounded-lg`}
		>
			{project.previewImage ? (
				<img
					src={`${import.meta.env.VITE_API_STATIC_URL}/${project.previewImage}`}
					alt='project'
					className={`h-full w-full object-cover rounded-lg brightness-[60%] ${
						archived && 'brightness-[20%]'
					}`}
				/>
			) : (
				<div className='w-full h-full bg-gray rounded-lg flex items-center justify-center brightness-[60%]'>
					<PiImageSquareFill className='text-7xl text-black' />
				</div>
			)}

			{archived && (
				<h2 className='text-3xl font-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-red'>
					Архив
				</h2>
			)}

			<div className='absolute bottom-5 left-5 text-white'>{project.name}</div>
		</Link>
	)
}

export default ProjectItem
