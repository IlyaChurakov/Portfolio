import { FC, useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IoIosClose } from 'react-icons/io'
import { useOnClickOutside } from '../../../../profile/components/menu/useOnClickOutside'
import { modalData } from '../block-editor/modal.data'

export type Inputs = {
	type: string
	text: string
	color: string
}

interface IBlockAddProps {
	sectionId: string
	isVisible: boolean
	closeHandler: Function
	addBlock: Function
}

const BlockAddModal: FC<IBlockAddProps> = ({
	sectionId,
	isVisible,
	closeHandler,
	addBlock,
}) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<Inputs>()

	const { isShow, ref, setIsShow } = useOnClickOutside(false)

	useEffect(() => {
		if (isVisible) setIsShow(true)
	}, [isVisible])

	useEffect(() => {
		if (!isShow) closeHandler()
	}, [isShow])

	const onSubmit: SubmitHandler<Inputs> = async data => {
		await addBlock(sectionId, data)
		reset()
		setIsShow(false)
		closeHandler()
	}

	if (!isShow) return null

	return (
		<div
			className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-black rounded-lg'
			ref={ref}
		>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='relative w-full h-full p-5 grid grid-rows-[1fr_30px]'
			>
				<button
					onClick={() => {
						reset()
						setIsShow(false)
						closeHandler()
					}}
					className='text-white absolute top-2 right-2'
				>
					<IoIosClose fill='#fff' className='text-3xl' />
				</button>

				<div>
					<h2 className='text-white mb-5 text-center'>Тип</h2>
					<select
						className='w-full border-b-2 border-white bg-transparent text-white outline-none'
						defaultValue={'Основной текст'}
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

					<h2 className='text-white mb-5 text-center mt-5'>Текст</h2>
					<div className='w-full'>
						<textarea
							className='w-full border-b-2 border-white bg-transparent text-white outline-none'
							defaultValue={''}
							{...register('text', { required: true })}
						/>
					</div>
					{errors.text && (
						<span className=' text-red-500'>Заполните это поле</span>
					)}

					<h2 className='text-white mb-5 text-center mt-5'>Цвет текста</h2>
					<select
						className='w-full border-b-2 border-white bg-transparent text-white outline-none'
						defaultValue={'#000'}
						{...register('color', { required: true })}
					>
						{modalData.textColors.map(color => {
							return (
								<option value={color} className='text-black'>
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

export default BlockAddModal
