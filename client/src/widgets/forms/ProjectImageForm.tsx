import { useStores } from '@app/index'
import ImageLoader from '@features/ImageLoader'
import { uploadFile } from '@shared/lib/utils'
import Button from '@shared/ui/Button'
import { AxiosError } from 'axios'
import { observer } from 'mobx-react-lite'
import { SubmitHandler, useForm } from 'react-hook-form'
import ReactLoading from 'react-loading'

type Inputs = {
	preview: FileList | undefined
}

const ProjectImageForm = () => {
	const { projectStore, errorStore } = useStores()

	const {
		register,
		setValue,
		handleSubmit,
		formState: { isSubmitting },
	} = useForm<Inputs>()

	const onSubmit: SubmitHandler<Inputs> = async ({ preview }) => {
		try {
			if (preview) {
				const uploadedPreview = await uploadFile(preview)
				if (uploadedPreview) projectStore.project.previewImage = uploadedPreview
			} else {
				projectStore.project.previewImage = null
			}

			await projectStore.saveProject()
		} catch (err) {
			errorStore.add((err as AxiosError).message)
		}
	}

	const deletePreview = () => {
		setValue('preview', undefined)
		sendForm()
	}

	const sendForm = handleSubmit(onSubmit)

	return (
		<form onSubmit={sendForm} className='w-full h-full'>
			{isSubmitting ? (
				<ReactLoading type='spin' width={15} height={15} color='#9255E8' />
			) : (
				<>
					<ImageLoader
						uploadedImageUrl={projectStore.project.previewImage}
						register={register('preview')}
						setValue={setValue}
						submitForm={sendForm}
					/>
					<Button text='delete preview' onClick={deletePreview} />
				</>
			)}
		</form>
	)
}

export default observer(ProjectImageForm)
