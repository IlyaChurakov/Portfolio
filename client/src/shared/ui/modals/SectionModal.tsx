import {
	ISection,
	SectionInputs,
} from '@app/provider/store/types/project.types'
import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IoIosClose } from 'react-icons/io'

interface IBlockEditorProps {
	section: ISection | null | object
	closeHandler: Function
	editSection: Function
	addSection: Function
}

const SectionModal: FC<IBlockEditorProps> = ({
	section,
	closeHandler,
	editSection,
	addSection,
}) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<SectionInputs>()

	const onSubmit: SubmitHandler<SectionInputs> = async data => {
		if (section && 'id' in section) {
			await editSection(section.id, data)
		} else {
			await addSection(data)
		}

		reset()
		closeHandler()
	}

	if (!section) return null

	return (
		<div
			className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-black rounded-lg'
			style={{
				boxShadow: '0px 3px 42px -3px rgba(255, 255, 255, 0.1)',
			}}
		>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='relative w-full h-full p-5 grid grid-rows-[1fr_30px]'
			>
				<button
					onClick={() => {
						reset()
						closeHandler()
					}}
					className='text-white absolute top-2 right-2'
				>
					<IoIosClose fill='#fff' className='text-3xl' />
				</button>

				<div>
					<h2 className='text-white mb-5 text-center'>Название секции</h2>
					<input
						className='w-full border-b-2 border-white bg-transparent text-white outline-none'
						placeholder='Название секции'
						defaultValue={(section as ISection).name ?? ''}
						{...register('name', { required: true })}
					/>
					{errors.name && <span className='text-red'>Заполните это поле</span>}

					<h2 className='text-white mb-5 text-center mt-5'>
						Фоновое изображение
					</h2>
					<input
						className='w-full border-b-2 border-white bg-transparent text-white outline-none'
						placeholder='Вставьте ссылку на изображение'
						defaultValue={(section as ISection).background ?? ''}
						{...register('background')}
					/>

					<h2 className='text-white mb-5 text-center mt-5'>Отступы</h2>
					<input
						className='w-full border-b-2 border-white bg-transparent text-white outline-none'
						placeholder='Верхний Правый Нижний Левый'
						defaultValue={(section as ISection).paddings ?? ''}
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

export default SectionModal