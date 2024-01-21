import {
	BlockTypes,
	ColorTypes,
	IBlock,
	Inputs,
} from '@app/provider/store/types/project.types'
import { FC, useContext, useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Context } from '../../../main'
import AcceptButton from '../buttons/AcceptButton'
import CloseButton from '../buttons/CloseButton'
import ColorModalSelect from '../selects/ColorModalSelect'
import TypeModalSelect from '../selects/TypeModalSelect'

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
	const valuesForTypeSelect = Object.keys(BlockTypes).map(
		key => BlockTypes[key as keyof typeof BlockTypes]
	)
	const valuesForColorSelect = Object.keys(ColorTypes).map(
		key => ColorTypes[key as keyof typeof ColorTypes]
	)

	const { projectStore } = useContext(Context)

	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
		reset,
		setValue,
	} = useForm<Inputs>()

	useEffect(() => {
		if (block && 'type' in block) {
			setValue('type', BlockTypes[block.type as keyof typeof BlockTypes])
			setValue('color', block.color ?? '#fff')
			setValue('imgDescr', block.imgDescr ?? '')
		}
	}, [block])

	const typeSelectValue = watch('type')
	const colorSelectValue = watch('color')

	const onSubmit: SubmitHandler<Inputs> = async data => {
		const formData = new FormData()

		let imgPath: string | undefined

		if (data.image[0]) {
			formData.append('img', data.image[0])
			imgPath = (await projectStore.uploadImage(formData)) as unknown as string
		}

		const blockData = {
			sectionId,
			...block,
			...data,
			imgPath,
		}

		if (block && 'id' in block) {
			await editBlock(blockData)
		} else {
			await addBlock(blockData)
		}

		reset()
		closeHandler()
	}

	async function closeModal() {
		reset()
		await closeHandler()
	}

	if (!block) return null

	return (
		<div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-black rounded-lg'>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='relative w-full h-full p-5 grid grid-rows-[1fr_30px]'
			>
				<CloseButton onClick={closeModal} />

				<div>
					<h2 className='text-white mb-5 text-center'>Тип</h2>

					<TypeModalSelect
						defaultValue={defaultType}
						values={valuesForTypeSelect}
						register={{ ...register('type', { required: true }) }}
					/>

					{((typeSelectValue || defaultType) === BlockTypes.h1 ||
						(typeSelectValue || defaultType) === BlockTypes.p) && (
						<>
							<h2 className='text-white mb-5 text-center mt-5'>Текст</h2>

							<textarea
								defaultValue={(block as IBlock).text ?? ''}
								className='w-full border-b-2 border-white bg-transparent text-white outline-none'
								{...register('text', { required: true })}
							/>

							{errors.text && (
								<span className='text-red'>Заполните это поле</span>
							)}
						</>
					)}

					{typeSelectValue === BlockTypes.img && (
						<>
							<h2 className='text-white mb-5 text-center mt-5'>Изображение</h2>

							<input
								type='file'
								className='w-full border-b-2 border-white bg-transparent text-white outline-none'
								{...register('image', { required: true })}
							/>

							{errors.image && (
								<span className='text-red'>Изображение не загружено</span>
							)}

							<h2 className='text-white mb-5 text-center mt-5'>Описание</h2>

							<input
								defaultValue={(block as IBlock).imgDescr ?? ''}
								type='text'
								className='w-full border-b-2 border-white bg-transparent text-white outline-none'
								{...register('imgDescr')}
							/>
						</>
					)}

					<h2 className='text-white mb-5 text-center mt-5'>Цвет текста</h2>

					<ColorModalSelect
						values={valuesForColorSelect}
						textColor={(colorSelectValue as ColorTypes) || ColorTypes.white}
						register={{ ...register('color', { required: true }) }}
					/>
				</div>

				<AcceptButton type='submit' />
			</form>
		</div>
	)
}

export default BlockModal
