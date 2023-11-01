export function checkUserRoles(userRoles: string[], routeRoles: string[]) {
	return userRoles.some(userRole =>
		routeRoles.some(routeRole => userRole === routeRole)
	)
}
