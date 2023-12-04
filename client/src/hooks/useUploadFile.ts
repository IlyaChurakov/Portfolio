import { ChangeEvent, useContext, useState } from 'react'
import { Context } from '../main'

const useUploadFile = () => {
	const { store } = useContext(Context)
	const { projectStore } = useContext(Context)

	const [file, setFile] = useState<File>()

	const upload = async (id: number | string) => {
		const formData = new FormData()
		formData.append('img', file as File)
		console.log(file)

		if (typeof id === 'number') {
			store.uploadAvatar(id, formData)
		}
		if (typeof id === 'string') {
			projectStore.uploadPreview(id, formData)
		}
	}

	const selectFile = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			const selectedFile: File = e.target.files[0]
			setFile(selectedFile)
		}
	}

	return {
		selectFile,
		file,
		upload,
	}
}

export default useUploadFile
