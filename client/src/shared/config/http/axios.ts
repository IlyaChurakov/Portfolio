import axios from 'axios'

export const AuthClient = axios.create({
	withCredentials: true,
	baseURL: `${import.meta.env.VITE_API_URL}/auth`,
})

export const $axios = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
})

$axios.interceptors.request.use(config => {
	const accessToken = localStorage.getItem('token')
	config.headers.Authorization = `Bearer ${accessToken}`
	return config
})

$axios.interceptors.response.use(
	config => config,
	async error => {
		const originalRequest = error.config

		if (
			error.response.status == 401 &&
			error.config &&
			!error.config._isRetry
		) {
			originalRequest._isRetry = true
			try {
				const response = await axios.get(
					`${import.meta.env.VITE_API_URL}/auth/refresh`,
					{
						withCredentials: true,
					}
				)
				localStorage.setItem('token', response.data.accessToken)
			} catch (err) {
				console.log(`Не авторизован: ${error.response.status}`)
			}
		}
		throw error
	}
)
