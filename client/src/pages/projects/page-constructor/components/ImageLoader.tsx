import Button from '@shared/ui/form/Button'
import { observer } from 'mobx-react-lite'
import React, { useId, useState } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import { TbDownload } from 'react-icons/tb'

const ImageLoader = ({
	uploadedImageUrl,
	register,
	setValue,
}: {
	uploadedImageUrl: string | null
	register: UseFormRegisterReturn
	setValue: Function
}) => {
	const id = useId()
	const static_url = import.meta.env.VITE_API_STATIC_URL

	const [image, setImage] = useState<string | null>(
		uploadedImageUrl ? static_url + uploadedImageUrl : uploadedImageUrl
	)

	const onLoadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files ? e.target.files[0] : null
		if (!file) return

		setImage(URL.createObjectURL(file))
	}

	const deleteAvatar = () => {
		setValue('avatar', undefined)
		setImage(null)
	}

	return (
		<div className='flex flex-col justify-center'>
			<label
				htmlFor={id}
				className='block relative w-full h-[250px] cursor-pointer text-white'
			>
				<input
					id={id}
					type='file'
					{...register}
					onChange={onLoadImage}
					accept='image/*,.png,.jpg'
					className='h-0 w-0 absolute block -z-10 opacity-0'
				/>

				<div className='h-full w-full rounded-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 hover:opacity-100 flex justify-center items-center hover:bg-black hover:bg-opacity-50'>
					<TbDownload className='text-2xl' title='Загрузить изображение' />
				</div>
				{image ? (
					<img
						src={image}
						alt='img'
						className='w-full h-full object-cover rounded-lg'
					/>
				) : (
					<div className='w-full h-full bg-gray rounded-lg'></div>
				)}
			</label>

			<Button text='delete' onClick={deleteAvatar} />
		</div>
	)
}

export default observer(ImageLoader)
