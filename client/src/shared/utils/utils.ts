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

export const isObject = (object: any) => {
	return object != null && typeof object === 'object'
}

export function deepEqual(obj1: any, obj2: any): boolean {
	const keys1 = Object.keys(obj1)
	const keys2 = Object.keys(obj2)

	if (!isObject(obj1) || !isObject(obj2)) {
		return obj1 === obj2
	}

	if (keys1.length !== keys2.length) return false

	for (const key of keys1) {
		if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
			return false
		}
	}

	return true
}

export function fieldsChanges<T, J>(
	current: Partial<T>,
	updated: Partial<J>
): boolean {
	if (deepEqual(current, updated)) return false
	return true
}
