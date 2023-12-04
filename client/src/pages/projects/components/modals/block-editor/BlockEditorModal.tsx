import { FC, useContext, useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IoIosClose } from 'react-icons/io'
import { Context } from '../../../../../main'
import { IBlock } from '../../../../../models/IProject'
import { modalData } from './modal.data'

export type Inputs = {
	type: string
	text: string
	color: string
	image: File
}

interface IBlockEditorProps {
	sectionId: string
	block: IBlock
	isShow: boolean
	closeHandler: Function
	editBlock: Function
	defaultValues: Inputs
}

const BlockEditorModal: FC<IBlockEditorProps> = ({
	sectionId,
	block,
	isShow,
	closeHandler,
	editBlock,
	defaultValues,
}) => {
	const { projectStore } = useContext(Context)
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm<Inputs>()

	const elementType = watch('type')
	const image = watch('image')

	const onSubmit: SubmitHandler<Inputs> = async data => {
		const formData = new FormData()

		const file = data.image[0]

		formData.append('img', file as File)

		const imgPath = await projectStore.uploadImage(formData)

		console.log(imgPath)

		editBlock(sectionId, block.id, data, imgPath)
		closeHandler()
	}

	useEffect(() => {
		console.log(image)
	}, [image])

	if (!isShow) return null

	return (
		<div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-black rounded-lg'>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='relative w-full h-full p-5 grid grid-rows-[1fr_30px]'
			>
				<button
					onClick={() => closeHandler()}
					className='text-white absolute top-2 right-2'
				>
					<IoIosClose fill='#fff' className='text-3xl' />
				</button>

				<div>
					<h2 className='text-white mb-5 text-center'>Тип</h2>
					<select
						className='w-full border-b-2 border-white bg-transparent text-white outline-none'
						defaultValue={block.type || 'Основной текст'}
						{...register('type', { required: true })}
					>
						{modalData.types.map(type => {
							return (
								<option value={type} className='text-black'>
									{type}
								</option>
							)
						})}
					</select>

					{elementType === 'Основной текст' && (
						<>
							<h2 className='text-white mb-5 text-center mt-5'>Текст</h2>
							<div className='w-full'>
								<textarea
									className='w-full border-b-2 border-white bg-transparent text-white outline-none'
									defaultValue={block.text || ''}
									{...register('text', { required: true })}
								/>
							</div>
							{errors.text && (
								<span className='text-red'>Заполните это поле</span>
							)}
						</>
					)}

					{elementType === 'Изображение' && (
						<>
							<h2 className='text-white mb-5 text-center mt-5'>
								Загрузите изображение
							</h2>
							<div className='w-full'>
								<input
									type='file'
									className='w-full border-b-2 border-white bg-transparent text-white outline-none'
									{...register('image', { required: true })}
								/>
							</div>
							{errors.image && (
								<span className='text-red'>Изображение не загружено</span>
							)}
						</>
					)}

					<h2 className='text-white mb-5 text-center mt-5'>Цвет текста</h2>
					<select
						className='w-full border-b-2 border-white bg-gradient-to-r from-purple-500 to-pink-500 text-white outline-none'
						defaultValue={block.color || '#000'}
						{...register('color', { required: true })}
					>
						{modalData.textColors.map(color => {
							return (
								<option
									value={color}
									className='bg-gradient-to-r from-purple-500 to-pink-500'
									style={{ color: color }}
								>
									{color}
								</option>
							)
						})}
					</select>
				</div>

				<div className='flex justify-end'>
					<button
						type='submit'
						className='w-24 h-full text-white border-2 border-white'
					>
						Ок
					</button>
				</div>
			</form>
		</div>
	)
}

export default BlockEditorModal
