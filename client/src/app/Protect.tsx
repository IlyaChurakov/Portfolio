import { RoutePropsCustom } from '@shared/config/router/types'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStores } from './store/store'

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
		if (!authStore.isUserLogged) await authStore.checkAuth()

		if (route.isAuth) {
			if (!authStore.isUserLogged) return navigate('/login')

			if (route.role && userStore.user.role < route.role) {
				return navigate('/')
			}
		}
	}

	if (!authStore.isAppReady)
		return <div className='text-white text-4xl text-center'>Загрузка</div>

	return <>{children}</>
}

export default observer(Protect)
