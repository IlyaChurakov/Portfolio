import { observer } from 'mobx-react-lite'
import React, { useCallback, useEffect, useId, useState } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import { TbDownload } from 'react-icons/tb'

const ImageLoader = ({
	uploadedImageUrl,
	register,
	width,
	height,
	setValue,
	submitForm,
}: {
	uploadedImageUrl: string | null
	register: UseFormRegisterReturn
	setValue: Function
	submitForm?: Function
	width?: string
	height?: string
}) => {
	const memoizedRegister = useCallback(() => register, [register])

	const static_url = import.meta.env.VITE_API_STATIC_URL
	const path = uploadedImageUrl ? static_url + uploadedImageUrl : null

	const [imagePath, setImagePath] = useState<string | null>(path)

	const id = useId()

	useEffect(() => {
		console.log(uploadedImageUrl)
		setImagePath(path)
	}, [uploadedImageUrl])

	const onLoadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files ? e.target.files[0] : null
		if (!file) return

		setImagePath(URL.createObjectURL(file))
		setValue(register.name, { 0: file })
		submitForm && submitForm()
	}

	return (
		<label
			htmlFor={id}
			className='block relative w-full h-full cursor-pointer text-white'
			style={{ width, height }}
		>
			<input
				id={id}
				type='file'
				{...memoizedRegister}
				onChange={onLoadImage}
				accept='image/*,.png,.jpg'
				className='h-0 w-0 absolute block -z-10 opacity-0'
			/>

			<div className='h-full w-full rounded-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 hover:opacity-100 flex justify-center items-center hover:bg-black hover:bg-opacity-50'>
				<TbDownload className='text-2xl' title='Загрузить изображение' />
			</div>

			{imagePath ? (
				<img
					src={imagePath}
					alt='img'
					className='w-full h-full object-cover rounded-lg'
				/>
			) : (
				<div className='w-full h-full bg-gray rounded-lg'></div>
			)}
		</label>
	)
}

export default observer(ImageLoader)
