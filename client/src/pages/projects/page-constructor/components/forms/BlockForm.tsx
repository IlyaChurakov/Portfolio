import { useStores } from '@app/provider'
import {
	BlockModalInputs,
	BlockTypes,
	BlockTypesText,
	ColorTypes,
	IBlock,
	blockData,
} from '@app/provider/store/projectStore/types/project.types'
import { RootStore } from '@app/provider/store/rootStore'
import { RootStoreContext } from '@app/provider/store/store'
import AcceptButton from '@shared/ui/buttons/AcceptButton'
import CloseButton from '@shared/ui/buttons/CloseButton'
import Textarea from '@shared/ui/inputs/Textarea'
import ModalLoader from '@shared/ui/loaders/ModalLoader'
import ColorModalSelect from '@shared/ui/selects/ColorModalSelect'
import TypeModalSelect from '@shared/ui/selects/TypeModalSelect'
import { uploadFile } from '@shared/utils/utils'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'
import ImageLoader from '../ImageLoader'

const BlockForm = ({
	block,
	setIsOpen,
}: {
	block: IBlock
	setIsOpen: Function
}) => {
	const {
		register,
		formState: { errors },
		watch,
		handleSubmit,
		reset,
	} = useForm<BlockModalInputs>({
		defaultValues: {
			type: BlockTypes[block.type as keyof typeof BlockTypes] ?? 'Заголовок',
			text: block?.text ?? '',
			color: block?.color ?? '#fff',
		},
	})

	const type = watch('type')
	const image = watch('image')

	const projectStore = useStores(
		RootStoreContext,
		(contextData: RootStore) => contextData,
		(store: RootStore) => store.projectStore
	)

	const [loading, setLoading] = useState(false)

	const valuesForTypeSelect = Object.keys(BlockTypes).map(
		key => BlockTypes[key as keyof typeof BlockTypes]
	)
	const valuesForColorSelect = Object.keys(ColorTypes).map(
		key => ColorTypes[key as keyof typeof ColorTypes]
	)

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
			editBlock(blockData as blockData)
		} else {
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

		const newBlock: IBlock = {
			id: uuidv4(),
			type: BlockTypesText[data.type as keyof typeof BlockTypesText],
			text: data.text,
			color: data.color,
			imgPath: data.imgPath,
			imgDescr: data.imgDescr,
			sectionId: section.id,
		}

		section.blocks.push(newBlock)

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
		setIsOpen(false)
	}

	const isEqual = (value: string, values: string[]) => {
		return values.includes(value)
	}

	return (
		<>
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

						{isEqual(type, [BlockTypes.h1, BlockTypes.p]) && (
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

						{isEqual(type, [BlockTypes.img]) && (
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
							register={register('color')}
						/>
					</div>

					<AcceptButton type='submit' />
				</form>
			) : (
				<ModalLoader />
			)}
		</>
	)
}

export default BlockForm
