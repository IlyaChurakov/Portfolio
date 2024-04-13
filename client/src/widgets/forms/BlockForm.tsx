import { useStores } from '@app/index'
import {
	BlockTypes,
	BlockTypesText,
	ColorTypes,
	IBlock,
} from '@app/store/projectStore/types/project.types'
import { uploadFile } from '@shared/lib/utils'
import Button from '@shared/ui/Button'
import Input from '@shared/ui/Input'
import { default as Select } from '@shared/ui/Select'
import Textarea from '@shared/ui/Textarea'
import { AxiosError } from 'axios'
import { observer } from 'mobx-react-lite'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { IoClose } from 'react-icons/io5'
import { v4 as uuidv4 } from 'uuid'
import ImageLoader from '../../features/ImageLoader'

type BlockFormInputs = {
	type: string
	text: string
	color: string
	imgDescr?: string
	imgPath?: FileList
	items: {
		value: string
	}[]
}

interface IBlockFormProps {
	block: IBlock | null
	close: () => void
}

const BlockForm = ({ block: blockObj, close }: IBlockFormProps) => {
	if (!blockObj) return

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
		control,
	} = useForm<BlockFormInputs>({
		defaultValues: {
			type: transformedBlockType ?? 'Заголовок',
			text: blockObj.text ?? '',
			color: blockObj.color ?? '#fff',
			imgDescr: blockObj.imgDescr,
			items: blockObj.items?.map(item => ({ value: item })) ?? [],
		},
	})

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'items',
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

	function closeForm() {
		reset()
		close()
	}

	async function addOrEditBlock({ imgPath, type, ...data }: BlockFormInputs) {
		const project = { ...projectStore.project }

		let block: IBlock | undefined

		const findedSection = project.sections.find(
			section => section.id === blockObj!.sectionId
		)
		if (!findedSection) return

		const findedBlock = findedSection.blocks.find(
			block => block.id === blockObj!.id
		)

		if (findedBlock) {
			block = {
				...findedBlock,
				type: BlockTypesText[type as keyof typeof BlockTypesText],
				...data,
				items: data.items.map(item => item.value),
			}
		} else {
			block = {
				id: uuidv4(),
				type: BlockTypesText[type as keyof typeof BlockTypesText],
				...data,
				items: data.items.map(item => item.value),
				imgPath: null,
				sectionId: blockObj!.sectionId,
			}
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
				<Select
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
						<div className='w-full flex justify-end mb-3'>
							<Button onClick={deleteImage}>Удалить изображение</Button>
						</div>

						<Input
							type='text'
							isEdit
							register={register('imgDescr')}
							placeholder='Подпись изображения'
							className='w-full my-3 p-1'
						/>
					</>
				)}

				{isEqual(type, [BlockTypes.list]) && (
					<>
						{fields.length ? (
							fields.map((field, index) => (
								<div className='w-full flex my-2 items-center'>
									<div className='text-white mr-2 w-5'>{index + 1}</div>
									<Input
										isEdit
										type='text'
										className='flex-1 mr-2'
										key={field.id}
										register={register(`items.${index}.value` as const)}
									/>
									<button
										className='text-white'
										type='button'
										onClick={() => remove(index)}
									>
										<IoClose className='text-red text-2xl' />
									</button>
								</div>
							))
						) : (
							<div className='text-violet'>Список пуст</div>
						)}
						<button
							type='button'
							className='self-end mr-8 text-violet mb-5'
							onClick={() => append({ value: '' })}
						>
							Добавить
						</button>
					</>
				)}

				<Select
					placeholder='Выберите цвет текста'
					values={valuesForColorSelect}
					register={register('color')}
				/>
			</div>

			<div className='flex justify-between'>
				<Button onClick={closeForm}>Отменить</Button>
				<Button
					isLoading={isSubmitting}
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
