import { ChangeEvent, useContext, useState } from 'react'
import { Context } from '../../main'

const useUploadAvatar = () => {
	const { store } = useContext(Context)

	const [file, setFile] = useState<File>()

	const upload = async (id: number) => {
		const formData = new FormData()
		formData.append('img', file)

		store.uploadAvatar(id, formData)
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

export default useUploadAvatar
