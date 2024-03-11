import { useStores } from '@app/index'
import { ISection } from '@app/store/projectStore/types/project.types'
import ImageLoader from '@features/ImageLoader'
import { uploadFile } from '@shared/lib/utils'
import Button from '@shared/ui/form/Button'
import Input from '@shared/ui/form/Input'
import { AxiosError } from 'axios'
import { observer } from 'mobx-react-lite'
import { SubmitHandler, useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'

type SectionFormInputs = {
	name: string
	paddings: string
	backgroundPath?: FileList
}

interface ISectionFormProps {
	section: ISection
	closeModal: () => void
}

const SectionForm = ({
	section: sectionObj,
	closeModal,
}: ISectionFormProps) => {
	const { projectStore, errorStore } = useStores()

	const {
		register,
		handleSubmit,
		formState: { isSubmitting },
		reset,
		setValue,
	} = useForm<SectionFormInputs>({
		values: {
			name: sectionObj.name,
			paddings: sectionObj.paddings ?? '',
		},
	})

	const onSubmit: SubmitHandler<SectionFormInputs> = async data => {
		try {
			await addOrEditSection(data)

			closeForm()
		} catch (err) {
			errorStore.add((err as AxiosError).message)
		}
	}

	const closeForm = () => {
		reset()
		closeModal()
	}

	async function addOrEditSection({
		backgroundPath,
		...data
	}: SectionFormInputs) {
		const project = { ...projectStore.project }

		let section: ISection | undefined

		const findedSection = project.sections.find(
			section => section.id === sectionObj.id
		)

		if (findedSection) section = { ...findedSection, ...data }

		if (!section)
			section = { id: uuidv4(), blocks: [], ...data, backgroundPath: null }

		if (backgroundPath) {
			const uploaded = await uploadFile(backgroundPath)
			if (uploaded) section.backgroundPath = uploaded
		}

		const sections = findedSection
			? project.sections.map(sect => {
					if (sect.id === section?.id) {
						return section
					}
					return sect
			  })
			: [...projectStore.project.sections, section]

		projectStore.setProject({ ...project, sections })
	}

	const deleteBackground = () => {
		setValue('backgroundPath', undefined)
		sectionObj.backgroundPath = null
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='h-full flex flex-col'>
			<div className='flex-1 flex flex-col items-center'>
				<ImageLoader
					uploadedImageUrl={sectionObj.backgroundPath}
					register={register('backgroundPath')}
					setValue={setValue}
					width='100%'
					height='200px'
				/>
				<div className='w-full flex justify-end mb-3'>
					<Button onClick={deleteBackground}>Удалить изображение</Button>
				</div>

				<Input
					type='text'
					isEdit
					register={register('name')}
					placeholder='Название секции'
					className='w-full  mb-3'
				/>

				<Input
					type='text'
					isEdit
					register={register('paddings')}
					placeholder='Отступы'
					className='w-full'
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

export default observer(SectionForm)
