import React, { ChangeEvent, memo } from 'react'
import { TbDownload } from 'react-icons/tb'

interface IPictureLoaderProps {
	onFileChange: (e: ChangeEvent<HTMLInputElement>) => void
	path: string
}

const PictureUploader: React.FC<IPictureLoaderProps> = ({
	onFileChange,
	path,
}) => {
	return (
		<label htmlFor='select_avatar' className='cursor-pointer'>
			<input
				id='select_avatar'
				type='file'
				onChange={e => onFileChange(e)}
				className='h-0 w-0 absolute block -z-10 opacity-0'
			/>

			<div className='h-full w-full cursor-pointer rounded-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 hover:opacity-100 flex justify-center items-center hover:bg-black hover:bg-opacity-50'>
				<TbDownload className='text-2xl' />
			</div>

			{path ? (
				<img
					src={path}
					alt='avatar'
					className='w-full h-full object-cover rounded-lg hover:opacity-30'
				/>
			) : (
				<div className='h-full w-full bg-gray'></div>
			)}
		</label>
	)
}

export default memo(PictureUploader)
