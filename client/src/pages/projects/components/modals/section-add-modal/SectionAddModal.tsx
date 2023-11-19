import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IoIosClose } from 'react-icons/io'

type Inputs = {
	name: string
	background: string
	paddings: string
}

interface IBlockAddProps {
	isVisible: boolean
	closeHandler: Function
	addSection: Function
}

const SectionAddModal: FC<IBlockAddProps> = ({
	isVisible,
	closeHandler,
	addSection,
}) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<Inputs>()

	const onSubmit: SubmitHandler<Inputs> = async data => {
		await addSection(data)
		reset()
		closeHandler()
	}

	if (!isVisible) return null

	return (
		<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-black bg-opacity-80 border-2 border-gray-500 rounded-lg'>
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
					<h2 className='text-white mb-5 text-center'>Название секции</h2>
					<input
						className='w-full border-b-2 border-white bg-transparent text-white outline-none'
						placeholder='Название секции'
						defaultValue={''}
						{...register('name', { required: true })}
					/>
					{errors.name && (
						<span className=' text-red-500'>Заполните это поле</span>
					)}

					<h2 className='text-white mb-5 text-center mt-5'>
						Фоновое изображение
					</h2>
					<input
						className='w-full border-b-2 border-white bg-transparent text-white outline-none'
						placeholder='Вставьте ссылку на изображение'
						defaultValue={''}
						{...register('background')}
					/>

					<h2 className='text-white mb-5 text-center mt-5'>Отступы</h2>
					<input
						className='w-full border-b-2 border-white bg-transparent text-white outline-none'
						placeholder='20px 0px 20px 0px'
						defaultValue={''}
						{...register('paddings')}
					/>
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

export default SectionAddModal