import {
	BlockTypes,
	IBlock,
	Inputs,
} from '@app/provider/store/types/project.types'
import { FC, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IoIosClose } from 'react-icons/io'
import { modalData } from './blockModal.data'

interface IBlockModalProps {
	sectionId: string
	block: IBlock | null | object
	closeHandler: Function
	editBlock: Function
	addBlock: Function
	defaultType: BlockTypes
}

// Компонент модального окна для блока
// Принимает block, если у него есть свойства - окно редактирования блока
// Если block - пустой объект - окно добавления блока
// Для закрытия окна - block должен быть равен null

const BlockModal: FC<IBlockModalProps> = ({
	sectionId,
	block,
	closeHandler,
	editBlock,
	addBlock,
	defaultType,
}) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm<Inputs>()

	const [typeState, setTypeState] = useState(
		block && 'type' in block
			? BlockTypes[block.type as keyof typeof BlockTypes]
			: defaultType
	)

	const typeSelectValue = watch('type')

	useEffect(() => {
		if (typeSelectValue) setTypeState(typeSelectValue as BlockTypes)
	}, [typeSelectValue])

	const onSubmit: SubmitHandler<Inputs> = async data => {
		// const formData = new FormData()

		// const file = data.image[0]

		// formData.append('img', file as File)

		// const imgPath = await projectStore.uploadImage(formData)

		if (block && 'id' in block) {
			await editBlock(sectionId, block.id, data)
		} else {
			await addBlock(sectionId, data)
		}
		closeHandler()
	}

	if (!block) return null

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
						defaultValue={typeState}
						className='w-full border-b-2 border-white bg-transparent text-white outline-none'
						{...register('type', { required: true })}
					>
						{modalData.types.map(type => {
							return (
								<option value={type} key={type} className='text-black'>
									{type}
								</option>
							)
						})}
					</select>

					{(typeState === 'Заголовок' || typeState === 'Основной текст') && (
						<>
							<h2 className='text-white mb-5 text-center mt-5'>Текст</h2>
							<div className='w-full'>
								<textarea
									defaultValue={(block as IBlock).text || ''}
									className='w-full border-b-2 border-white bg-transparent text-white outline-none'
									{...register('text', { required: true })}
								/>
							</div>
							{errors.text && (
								<span className='text-red'>Заполните это поле</span>
							)}
						</>
					)}

					{typeState === 'Изображение' && (
						<>
							<h2 className='text-white mb-5 text-center mt-5'>Изображение</h2>
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

							<h2 className='text-white mb-5 text-center mt-5'>Описание</h2>
							<div className='w-full'>
								<input
									type='text'
									className='w-full border-b-2 border-white bg-transparent text-white outline-none'
									{...register('imgDescr', { required: true })}
								/>
							</div>
						</>
					)}

					<h2 className='text-white mb-5 text-center mt-5'>Цвет текста</h2>
					<select
						className='w-full border-b-2 border-white bg-transparent text-white outline-none'
						{...register('color', { required: true })}
					>
						{modalData.textColors.map(color => {
							return (
								<option value={color} key={color} style={{ color: color }}>
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

export default BlockModal
