import {
	ISection,
	SectionData,
	SectionModalInputs,
} from '@app/provider/store/types/project.types'
import { uploadFile } from '@shared/utils/utils'
import { observer } from 'mobx-react-lite'
import { useContext, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'
import { Context } from '../../../../../main'
import AcceptButton from '../../../../../shared/ui/buttons/AcceptButton'
import CloseButton from '../../../../../shared/ui/buttons/CloseButton'
import Input from '../../../../../shared/ui/inputs/Input'
import ModalLoader from '../../../../../shared/ui/loaders/ModalLoader'
import ImageLoader from '../ImageLoader'

const SectionModal = ({
	section,
	closeHandler,
}: {
	section: ISection | object | null
	closeHandler: () => void
}) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		watch,
	} = useForm<SectionModalInputs>()

	const { projectStore } = useContext(Context)

	const [loading, setLoading] = useState(false)

	const bgImage = watch('background')

	const onSubmit: SubmitHandler<SectionModalInputs> = async data => {
		setLoading(true)

		const { 0: file } = data.background

		const imgPath = await uploadFile(file)

		const sectionData = {
			...section,
			...data,
			backgroundPath: imgPath ?? (section as ISection).backgroundPath,
		}

		if (section && 'id' in section) {
			editSection(sectionData as SectionData)
		} else {
			addSection(sectionData as SectionData)
		}

		setLoading(false)
		closeModal()
	}

	function addSection(data: SectionData) {
		const project = { ...projectStore.project }

		project.sections.push({
			id: uuidv4(),
			name: data.name,
			backgroundPath: data.backgroundPath,
			paddings: data.paddings,
			blocks: [],
		} as unknown as ISection)

		projectStore.setProject(project)
	}
	function editSection(data: SectionData) {
		const project = { ...projectStore.project }

		const section = project.sections.find(section => section.id === data.id)
		if (!section) return

		section.name = data.name
		section.backgroundPath = data.backgroundPath
		section.paddings = data.paddings

		projectStore.setProject(project)
	}

	async function deleteBackground(section: ISection) {
		const project = { ...projectStore.project }

		const findedSection = project.sections.find(sec => sec.id === section.id)
		if (!findedSection) return

		findedSection.backgroundPath = ''

		projectStore.setProject(project)
	}

	function closeModal() {
		reset()
		closeHandler()
	}

	if (!section) return

	return (
		<div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-black rounded-lg shadow-xl'>
			{!loading ? (
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='relative w-full h-full p-5 grid grid-rows-[1fr_30px]'
				>
					<CloseButton onClick={closeModal} />

					<div>
						<h2 className='mb-5 text-white text-center'>Название секции</h2>
						<Input
							placeholder='Название секции'
							defaultValue={(section as ISection).name}
							register={register('name', { required: true })}
						/>
						{errors.name && (
							<span className='text-red'>Заполните это поле</span>
						)}

						<h2 className='my-5 text-white text-center'>Фоновое изображение</h2>
						<ImageLoader
							clientImage={bgImage as unknown as FileList}
							serverImage={(section as ISection).backgroundPath}
							register={register('background')}
							labelId='select_background'
						/>
						<button
							type='button'
							onClick={() => deleteBackground(section as ISection)}
							className='block mt-2 ml-auto text-red text-xs'
						>
							Удалить фоновое изображение
						</button>

						<h2 className='my-5 text-white text-center'>Отступы</h2>
						<Input
							placeholder='Отступы'
							defaultValue={(section as ISection).paddings}
							register={register('paddings')}
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

export default observer(SectionModal)
