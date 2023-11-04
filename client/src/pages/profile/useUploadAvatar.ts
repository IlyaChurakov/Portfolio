import { ChangeEvent, useState } from 'react'

const useUploadAvatar = () => {
	const [file, setFile] = useState<File>()

	const selectFile = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			const selectedFile: File = e.target.files[0]
			setFile(selectedFile)
		}
	}

	return {
		selectFile,
		file,
	}
}

export default useUploadAvatar
