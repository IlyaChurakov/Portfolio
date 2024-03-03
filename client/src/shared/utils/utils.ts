import { $axios } from '@shared/config'
import dayjs from 'dayjs'

export function checkUserRoles(routeRoles: string[], userRoles: string[]) {
	return userRoles.some(userRole =>
		routeRoles.some(routeRole => userRole === routeRole)
	)
}

export function transformDate(date: Date): string {
	return dayjs(date).format('YYYY-MM-DD HH:mm')
}

export function fileReader(file: File | null) {
	if (!file) return null

	const reader = new FileReader()

	return new Promise<string | ArrayBuffer | null>(resolve => {
		reader.onload = e => {
			resolve(e.target?.result || null)
		}
		reader.readAsDataURL(file)
	})
}

export async function uploadFile(files: FileList) {
	const file = files[0]
	if (!file) return

	let data = new FormData()
	data.append('file', file)

	const response = await $axios.post<{
		name: string
		path: string
		size: string
		type: string
	}>(`/projects/upload-image`, data)
	if (!response.data.path) throw new Error('Ошибка загрузки файла')

	return response.data.path
}
