import dayjs from 'dayjs'

export function checkUserRoles(userRoles: string[], routeRoles: string[]) {
	return userRoles.some(userRole =>
		routeRoles.some(routeRole => userRole === routeRole)
	)
}

export function transformDate(date: Date): string {
	return dayjs(date).format('YYYY-MM-DD HH:mm')
}
