import {
	BlockModalInputs,
	BlockTypes,
	BlockTypesText,
	ColorTypes,
	IBlock,
	blockData,
} from '@app/provider/store/types/project.types'
import { uploadFile } from '@shared/utils/utils'
import { observer } from 'mobx-react-lite'
import { useContext, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'
import { Context } from '../../../../../main'
import AcceptButton from '../../../../../shared/ui/buttons/AcceptButton'
import CloseButton from '../../../../../shared/ui/buttons/CloseButton'
import Textarea from '../../../../../shared/ui/inputs/Textarea'
import ModalLoader from '../../../../../shared/ui/loaders/ModalLoader'
import ColorModalSelect from '../../../../../shared/ui/selects/ColorModalSelect'
import TypeModalSelect from '../../../../../shared/ui/selects/TypeModalSelect'
import ImageLoader from '../ImageLoader'

// Компонент модального окна для блока

// Принимает block, если у него есть свойства - окно редактирования блока
// Если block - пустой объект - окно добавления блока
// Для закрытия окна - block должен быть равен null

const BlockModal = ({
	block,
	closeHandler,
}: {
	block: IBlock | object | null
	closeHandler: () => void
}) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
		reset,
		setValue,
	} = useForm<BlockModalInputs>()

	const { projectStore } = useContext(Context)

	const [loading, setLoading] = useState(false)

	const valuesForTypeSelect = Object.keys(BlockTypes).map(
		key => BlockTypes[key as keyof typeof BlockTypes]
	)
	const valuesForColorSelect = Object.keys(ColorTypes).map(
		key => ColorTypes[key as keyof typeof ColorTypes]
	)

	const typeSelectValue = watch('type')
	const colorSelectValue = watch('color')
	const image = watch('image')

	useEffect(() => {
		if (block && 'type' in block) {
			setValue('type', BlockTypes[block.type as keyof typeof BlockTypes])
			setValue('color', block.color ?? '#fff')
			setValue('text', block.text ?? '')
		} else {
			setValue('type', BlockTypes['h1'])
			setValue('color', '#fff')
			setValue('text', '')
		}
	}, [block])

	const onSubmit: SubmitHandler<BlockModalInputs> = async data => {
		setLoading(true)

		const file = data.image ? data.image[0] : null

		const imgPath = await uploadFile(file)

		const blockData = {
			...block,
			...data,
			imgPath: imgPath ?? (block as IBlock).imgPath,
		}

		if (block && 'id' in block) {
			console.log('edit')
			editBlock(blockData as blockData)
		} else {
			console.log('add')
			addBlock(blockData as blockData)
		}

		setLoading(false)
		closeModal()
	}

	const addBlock = (data: blockData) => {
		const project = { ...projectStore.project }

		const section = project.sections.find(
			section => section.id === data.sectionId
		)
		if (!section) return

		section.blocks.push({
			id: uuidv4(),
			type: BlockTypesText[data.type as keyof typeof BlockTypesText],
			text: data.text,
			color: data.color,
			imgPath: data.imgPath,
			imgDescr: data.imgDescr,
			sectionId: section.id,
		} as unknown as IBlock)

		projectStore.setProject(project)
	}
	const editBlock = (data: blockData) => {
		const project = { ...projectStore.project }

		const section = project.sections.find(
			section => section.id === data.sectionId
		)
		if (!section) return

		const block = section.blocks.find(block => block.id === data.id)
		if (!block) return

		block.text = data.text
		block.type = BlockTypesText[data.type as keyof typeof BlockTypesText]
		block.color = data.color
		block.imgPath = data.image
		block.imgDescr = data.imgDescr

		projectStore.setProject(project)
	}

	async function deleteImage(block: IBlock) {
		const project = { ...projectStore.project }

		const findedSection = project.sections.find(
			sec => sec.id === block.sectionId
		)
		if (!findedSection) return

		const findedBlock = findedSection.blocks.find(b => b.id === block.id)
		if (!findedBlock) return

		findedBlock.imgPath = ''

		projectStore.setProject(project)
	}

	function closeModal() {
		reset()
		closeHandler()
	}

	if (!block) return null

	return (
		<div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-black rounded-lg'>
			{!loading ? (
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='relative w-full h-full p-5 grid grid-rows-[1fr_30px]'
				>
					<CloseButton onClick={closeModal} />

					<div>
						<h2 className='text-white mb-5 text-center'>Тип</h2>
						<TypeModalSelect
							values={valuesForTypeSelect}
							register={register('type', { required: true })}
						/>

						{(typeSelectValue === BlockTypes.h1 ||
							typeSelectValue === BlockTypes.p) && (
							<>
								<h2 className='text-white mb-5 text-center mt-5'>Текст</h2>
								<Textarea
									defaultValue={(block as IBlock).text}
									register={register('text', { required: true })}
								/>
								{errors.text && (
									<span className='text-red'>Заполните это поле</span>
								)}
							</>
						)}

						{typeSelectValue === BlockTypes.img && (
							<>
								<h2 className='text-white mb-5 text-center mt-5'>
									Изображение
								</h2>
								<ImageLoader
									clientImage={image}
									serverImage={(block as IBlock).imgPath}
									register={register('image', { required: true })}
									labelId='select_img'
								/>
								{errors.image && (
									<span className='text-red'>Изображение не загружено</span>
								)}
								<button
									type='button'
									onClick={() => deleteImage(block as IBlock)}
									className='block mt-2 ml-auto text-red text-xs'
								>
									Удалить фоновое изображение
								</button>

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
							textColor={(colorSelectValue as ColorTypes) ?? ColorTypes.white}
							register={register('color')}
						/>
					</div>

					<AcceptButton type='submit' />
				</form>
			) : (
				<ModalLoader />
			)}
		</div>
	)
}

export default observer(BlockModal)
