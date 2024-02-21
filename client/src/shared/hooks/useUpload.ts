import { RootStore } from '@app/provider/store/rootStore'
import { RootStoreContext, useStores } from '@app/provider/store/store'
import { ChangeEvent } from 'react'

const useUpload = () => {
	const { uploadImage } = useStores(
		RootStoreContext,
		(contextData: RootStore) => contextData,
		(store: RootStore) => store.projectStore
	)

	const selectFile = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files?.length) {
			const selectedFile: File = e.target.files[0]

			return selectedFile
		}
	}

	const upload = async (file: File) => {
		const formData = new FormData()
		formData.append('img', file as File)

		const fileName = await uploadImage(formData)

		return fileName
	}

	return { upload, selectFile }
}

export default useUpload
