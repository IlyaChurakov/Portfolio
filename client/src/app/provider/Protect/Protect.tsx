import { AppRoutesPrivate, RoutePropsCustom } from '@shared/config/router/types'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useStores } from '..'
import { RootStore } from '../store/rootStore'
import { RootStoreContext } from '../store/store'

const Protect = observer(
	({
		route,
		children,
	}: {
		children: React.ReactNode
		route: Record<AppRoutesPrivate, RoutePropsCustom>
	}) => {
		const { isAuth, checkAuth, isLoading } = useStores(
			RootStoreContext,
			(contextData: RootStore) => contextData,
			(store: RootStore) => store.authStore
		)
		const { pathname } = useLocation()
		const navigate = useNavigate()

		useEffect(() => {
			console.log(isAuth)
		}, [route])

		const checkUserAuth = async () => {
			if (localStorage.getItem('token')) {
				await checkAuth()

				if (isAuth === false) navigate('/')
			}
		}

		if (pathname === '/login' || pathname === '/register') {
			if (!isAuth) {
				return <>{children}</>
			} else {
				return <Navigate to={'/'} />
			}
		} else {
			if (isAuth) {
				return <>{children}</>
			}
		}
	}
)

export default Protect
