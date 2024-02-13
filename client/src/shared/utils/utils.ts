import { $axios } from '@shared/config'
import { AxiosProgressEvent } from 'axios'
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

export async function uploadFile(file: File | null, func: Function = () => {}) {
	if (!file) return

	let data = new FormData()
	data.append('file', file)

	const controller = new AbortController()
	const { signal: abortSignal } = controller

	const options = {
		onUploadProgress: (progressEvent: AxiosProgressEvent) => {
			func(progressEvent)
		},
		signal: abortSignal,
	}

	const response = await $axios.post(`/projects/upload-image`, data, options)

	return response.data as string
}
