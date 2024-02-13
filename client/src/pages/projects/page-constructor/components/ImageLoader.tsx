import { fileReader } from '@shared/utils/utils'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import { TbDownload } from 'react-icons/tb'

const ImageLoader: React.FC<{
	serverImage: string | undefined
	clientImage: FileList | undefined
	register: UseFormRegisterReturn
	labelId: string
}> = observer(({ clientImage, serverImage, register, labelId }) => {
	const [image, setImage] = useState<string>()

	useEffect(() => {
		if (clientImage && clientImage[0]) {
			getFileName(clientImage[0])
		}
	}, [clientImage])

	async function getFileName(file: File | null) {
		const fileName = await fileReader(file)
		if (!fileName) return

		setImage(fileName as string)
	}

	return (
		<label
			htmlFor={labelId}
			className='cursor-pointer block relative w-full h-20'
		>
			<input
				id={labelId}
				type='file'
				className='h-0 w-0 absolute block -z-10 opacity-0'
				{...register}
			/>

			<div className='h-full w-full cursor-pointer rounded-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 hover:opacity-100 flex justify-center items-center hover:bg-black hover:bg-opacity-50'>
				<TbDownload className='text-2xl' />
			</div>

			{image ?? serverImage ? (
				<img
					src={image ?? `${import.meta.env.VITE_API_STATIC_URL}${serverImage}`}
					alt='img'
					className='h-20 max-w-full m-auto'
				/>
			) : (
				<div className='h-20 w-full bg-gray rounded-lg'></div>
			)}
		</label>
	)
})

export default ImageLoader
