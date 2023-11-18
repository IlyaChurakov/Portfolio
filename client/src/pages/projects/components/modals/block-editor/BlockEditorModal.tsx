import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { modalData } from './modal.data'

export type Inputs = {
	type: string
	text: string
	color: string
}

interface IBlockEditorProps {
	sectionId: string
	blockId: string
	isShow: boolean
	closeHandler: Function
	editBlock: Function
	defaultValues: Inputs
}

const BlockEditorModal: FC<IBlockEditorProps> = ({
	sectionId,
	blockId,
	isShow,
	closeHandler,
	editBlock,
	defaultValues,
}) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>()

	const onSubmit: SubmitHandler<Inputs> = data => {
		editBlock(sectionId, blockId, data)
	}

	if (!isShow) return null

	return (
		<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-black bg-opacity-80 border-2 border-gray-500 rounded-lg p-5'>
			<button onClick={() => closeHandler()} className=' text-white'>
				Закрыть
			</button>

			<form onSubmit={handleSubmit(onSubmit)}>
				<h2 className='text-white mb-5 text-center'>Тип</h2>
				<select
					className='w-full'
					defaultValue={defaultValues.type}
					{...register('type', { required: true })}
				>
					{modalData.types.map(type => {
						return <option value={type}>{type}</option>
					})}
				</select>

				<h2 className='text-white mb-5 text-center mt-5'>Текст</h2>
				<div className='w-full'>
					<textarea
						className='w-full rounded-lg'
						defaultValue={defaultValues.text}
						{...register('text', { required: true })}
					/>
				</div>
				{errors.text && (
					<span className=' text-red-500'>Заполните это поле</span>
				)}

				<h2 className='text-white mb-5 text-center mt-5'>Цвет текста</h2>
				<select
					className='w-full'
					defaultValue={defaultValues.color}
					{...register('color', { required: true })}
				>
					{modalData.textColors.map(color => {
						return <option value={color}>{color}</option>
					})}
				</select>

				<button
					type='submit'
					className='w-full h-10 text-white border-2 border-white'
				>
					Ок
				</button>
			</form>
		</div>
	)
}

export default BlockEditorModal
