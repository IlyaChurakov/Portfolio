import { useStores } from '@app/index'
import ImageLoader from '@features/ImageLoader'
import { uploadFile } from '@shared/lib/utils'
import Button from '@shared/ui/Button'
import Select from '@shared/ui/Select'
import { AxiosError } from 'axios'
import { observer } from 'mobx-react-lite'
import { SubmitHandler, useForm } from 'react-hook-form'
import ReactLoading from 'react-loading'

type Inputs = {
	preview?: FileList | undefined
	type: string
}

const ProjectImageForm = () => {
	const { projectStore, errorStore } = useStores()

	const {
		register,
		setValue,
		handleSubmit,
		formState: { isSubmitting },
	} = useForm<Inputs>({
		values: {
			type: projectStore.project.type || 'Проект',
		},
	})

	const onSubmit: SubmitHandler<Inputs> = async ({ preview, type }) => {
		try {
			if (preview) {
				const uploadedPreview = await uploadFile(preview)
				if (uploadedPreview) projectStore.project.previewImage = uploadedPreview
			}

			if (type) projectStore.project.type = type

			await projectStore.saveProject()
		} catch (err) {
			errorStore.add((err as AxiosError).message)
		}
	}

	const deletePreview = () => {
		setValue('preview', undefined)
		projectStore.project.previewImage = null
		sendForm()
	}

	const sendForm = handleSubmit(onSubmit)

	const onChangeType = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setValue('type', e.target.value)
		sendForm()
	}

	const values = ['Проект', 'Навык']

	return (
		<form onSubmit={sendForm} className='w-full h-full'>
			{isSubmitting ? (
				<ReactLoading type='spin' width={15} height={15} color='#9255E8' />
			) : (
				<div className='grid grid-rows-[144px_30px] items-center bg-black'>
					<ImageLoader
						uploadedImageUrl={projectStore.project.previewImage}
						register={register('preview')}
						setValue={setValue}
						submitForm={sendForm}
					/>

					<Button onClick={deletePreview} className='m-auto'>
						Удалить превью
					</Button>
				</div>
			)}

			<Select
				onChange={onChangeType}
				values={values}
				register={register('type')}
			/>
		</form>
	)
}

export default observer(ProjectImageForm)
