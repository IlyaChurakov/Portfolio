import React from 'react'
import { PiImageSquareFill } from 'react-icons/pi'
import { Link } from 'react-router-dom'
import { IProject } from '../models/IProject'

interface IProjectItemProps {
	project: IProject
}

const ProjectItem: React.FC<IProjectItemProps> = ({ project }) => {
	return (
		<Link
			to={`/projects/${project.id}`}
			className='w-full bg-gray aspect-square flex justify-center items-center relative rounded-lg'
		>
			{project.previewImage ? (
				<img
					src={`${import.meta.env.VITE_API_STATIC_URL}/${project.previewImage}`}
					alt='project'
					className='h-full w-full object-cover rounded-lg brightness-[60%]'
				/>
			) : (
				<div className='w-full h-full bg-gray rounded-lg flex items-center justify-center brightness-[60%]'>
					<PiImageSquareFill className='text-7xl text-black' />
				</div>
			)}

			<div className='absolute bottom-5 left-5 text-white'>{project.name}</div>
		</Link>
	)
}

export default ProjectItem
