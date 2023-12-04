import React from 'react'
import { TbDownload } from 'react-icons/tb'
import useUploadFile from '../hooks/useUploadFile'

interface ILoadFileProps {
	loadFunction: Function
}

const LoadFile: React.FC<ILoadFileProps> = ({ loadFunction }) => {
	const { selectFile, file, upload } = useUploadFile(loadFunction)

	return (
		<label htmlFor='select_avatar' className='cursor-pointer'>
			<input
				id='select_avatar'
				type='file'
				onChange={e => selectFile(e)}
				className='h-0 w-0 absolute block -z-10 opacity-0'
			/>

			<div className='h-full w-full cursor-pointer rounded-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 hover:opacity-100 flex justify-center items-center hover:bg-black hover:bg-opacity-50 z-50'>
				<TbDownload className='text-2xl' />
			</div>
		</label>
	)
}

export default LoadFile
