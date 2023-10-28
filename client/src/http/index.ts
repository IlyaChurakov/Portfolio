import axios from 'axios'

const $axios = axios.create({
	withCredentials: true,
	baseURL: import.meta.env.VITE_API_URL,
})

$axios.interceptors.request.use(config => {
	config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
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
				console.log('ПОльзователь не авторизован')
			}
		}
		throw error
	}
)

export default $axios
