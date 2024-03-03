import { AppRoles, RoutePropsCustom } from '@shared/config/router/types'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStores } from '..'

const Protect = ({
	route,
	children,
}: {
	children: React.ReactNode
	route: RoutePropsCustom
}) => {
	const { authStore, userStore } = useStores()
	const navigate = useNavigate()

	useEffect(() => {
		checkAccess()
	}, [route])

	const checkAccess = async () => {
		await checkUserAuth()

		if (route.isAuth) {
			if (!authStore.isAuth) navigate('/')

			if (route.roles && !roleAccess(userStore.user.roles, route.roles)) {
				console.log(userStore.user.roles, route.roles)
				navigate('/')
			}
		}
	}

	const checkUserAuth = async () => {
		if (localStorage.getItem('token')) {
			if (!authStore.isAuth) await authStore.checkAuth()
		}
	}

	const roleAccess = (userRoles: string[], routeRoles: AppRoles[]) => {
		const uniqUserRoles = new Set(userRoles)

		const isAccess = !!routeRoles.find(routeRole =>
			uniqUserRoles.has(routeRole)
		)

		return isAccess
	}

	return <>{children}</>
}

export default observer(Protect)
