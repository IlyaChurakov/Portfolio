import { ChangeEvent, useContext } from 'react'
import { Context } from '../../main'

const useUpload = () => {
	const { projectStore } = useContext(Context)

	const selectFile = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files?.length) {
			const selectedFile: File = e.target.files[0]

			return selectedFile
		}
	}

	const upload = async (file: File) => {
		const formData = new FormData()
		formData.append('img', file as File)

		const fileName = await projectStore.uploadImage(formData)

		return fileName
	}

	return { upload, selectFile }
}

export default useUpload
