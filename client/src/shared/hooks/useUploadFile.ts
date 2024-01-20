import { ChangeEvent, useContext, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Context } from '../../main'

const editRegex = /\/edit$/
const profileRegex = /\/profile$/

const useUploadFile = () => {
	const { store } = useContext(Context)
	const { projectStore } = useContext(Context)
	const { pathname } = useLocation()

	const [file, setFile] = useState<File>()

	const selectFile = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			const selectedFile: File = e.target.files[0]
			setFile(selectedFile)
		}
	}

	const upload = async (id: number | string) => {
		const formData = new FormData()
		formData.append('img', file as File)

		if (profileRegex.test(pathname)) {
			store.uploadAvatar(+id, formData)
		}

		if (editRegex.test(pathname)) {
			projectStore.uploadPreview(id as string, formData)
		}
	}

	return {
		selectFile,
		file,
		upload,
	}
}

export default useUploadFile
