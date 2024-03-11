import { useStores } from '@app/index'
import {
	BlockTypes,
	BlockTypesText,
	ColorTypes,
	IBlock,
} from '@app/store/projectStore/types/project.types'
import { uploadFile } from '@shared/lib/utils'
import Button from '@shared/ui/form/Button'
import Input from '@shared/ui/form/Input'
import Textarea from '@shared/ui/form/Textarea'
import ColorModalSelect from '@shared/ui/selects/ColorModalSelect'
import TypeModalSelect from '@shared/ui/selects/TypeModalSelect'
import { AxiosError } from 'axios'
import { observer } from 'mobx-react-lite'
import { SubmitHandler, useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'
import ImageLoader from '../../features/ImageLoader'

type BlockFormInputs = {
	type: string
	text: string
	color: string
	imgDescr?: string
	imgPath?: FileList
}

interface IBlockFormProps {
	block: IBlock
	closeModal: () => void
}

const BlockForm = ({ block: blockObj, closeModal }: IBlockFormProps) => {
	const { projectStore, errorStore } = useStores()

	const transformedBlockType =
		BlockTypes[blockObj.type as keyof typeof BlockTypes]
	const valuesForTypeSelect = Object.keys(BlockTypes).map(
		key => BlockTypes[key as keyof typeof BlockTypes]
	)
	const valuesForColorSelect = Object.keys(ColorTypes).map(
		key => ColorTypes[key as keyof typeof ColorTypes]
	)

	const {
		register,
		handleSubmit,
		formState: { isSubmitting },
		reset,
		setValue,
		watch,
	} = useForm<BlockFormInputs>({
		values: {
			type: transformedBlockType ?? 'Заголовок',
			text: blockObj?.text ?? '',
			color: blockObj?.color ?? '#fff',
			imgDescr: blockObj.imgDescr,
		},
	})

	const type = watch('type')

	const onSubmit: SubmitHandler<BlockFormInputs> = async data => {
		try {
			await addOrEditBlock(data)

			closeForm()
		} catch (err) {
			errorStore.add((err as AxiosError).message)
		}
	}

	const closeForm = () => {
		reset()
		closeModal()
	}

	async function addOrEditBlock({ imgPath, type, ...data }: BlockFormInputs) {
		const project = { ...projectStore.project }

		let block: IBlock | undefined

		const findedSection = project.sections.find(
			section => section.id === blockObj.sectionId
		)
		if (!findedSection) return

		const findedBlock = findedSection.blocks.find(
			block => block.id === blockObj.id
		)

		if (findedBlock)
			block = {
				...findedBlock,
				type: BlockTypesText[type as keyof typeof BlockTypesText],
				...data,
			}

		if (!block)
			block = {
				id: uuidv4(),
				type: BlockTypesText[type as keyof typeof BlockTypesText],
				...data,
				imgPath: null,
				sectionId: blockObj.sectionId,
			}

		if (imgPath) {
			const uploaded = await uploadFile(imgPath)
			if (uploaded) block.imgPath = uploaded
		}

		const blocks = findedBlock
			? findedSection.blocks.map(b => {
					if (b.id === block?.id) {
						return block
					}
					return b
			  })
			: [...findedSection.blocks, block]

		const section = { ...findedSection, blocks }

		const sections = project.sections.map(sect => {
			if (sect.id === section?.id) {
				return section
			}
			return sect
		})

		projectStore.setProject({ ...project, sections })
	}

	const deleteImage = () => {
		setValue('imgPath', undefined)
		blockObj.imgPath = null
	}

	const isEqual = (value: string, values: string[]) => {
		return values.includes(value)
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='h-full flex flex-col'>
			<div className='flex-1 flex flex-col items-center'>
				<TypeModalSelect
					values={valuesForTypeSelect}
					register={register('type', { required: true })}
					className='w-full mb-3 p-1'
				/>

				{isEqual(type, [BlockTypes.h1, BlockTypes.p]) && (
					<Textarea
						isEdit
						register={register('text', { required: true })}
						className='w-full mb-3 p-1'
					/>
				)}

				{isEqual(type, [BlockTypes.img]) && (
					<>
						<ImageLoader
							uploadedImageUrl={blockObj.imgPath}
							register={register('imgPath')}
							setValue={setValue}
							width='100%'
							height='200px'
						/>
						<Button onClick={deleteImage}>Удалить изображение</Button>

						<Input
							type='text'
							isEdit
							register={register('imgDescr')}
							placeholder='Подпись изображения'
							className='w-full my-3 p-1'
						/>
					</>
				)}

				<ColorModalSelect
					values={valuesForColorSelect}
					register={register('color')}
				/>
			</div>

			<div className='flex justify-between'>
				<Button onClick={closeForm}>Отменить</Button>
				<Button
					isLoading={isSubmitting}
					variant='contained'
					loadingColor='white'
					type='submit'
					width='100px'
					height='30px'
				>
					Сохранить
				</Button>
			</div>
		</form>
	)
}

export default observer(BlockForm)
