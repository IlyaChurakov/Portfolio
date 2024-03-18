import { useStores } from '@app/index'
import Button from '@shared/ui/Button'
import Input from '@shared/ui/Input'
import { AxiosError } from 'axios'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

type Inputs = {
	email: string
	password: string
}

const LoginForm = () => {
	const navigate = useNavigate()
	const { authStore } = useStores()

	useEffect(() => {
		if (authStore.isAuth) {
			navigate('/')
		}
	}, [authStore.isAuth])

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		setError,
	} = useForm<Inputs>({
		mode: 'onChange',
	})

	const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
		try {
			await authStore.login(email, password)
		} catch (e) {
			const err = e as AxiosError

			if (err.response?.status === 404) {
				setError('email', {
					type: 'value',
					message: 'Неверный логин',
				})
			} else if (err.response?.status === 401) {
				setError('password', {
					type: 'value',
					message: 'Неверный пароль',
				})
			} else {
				console.log(`Неизвестная ошибка ${err.status}: ${err.message}`)
			}
		}
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='w-full h-full relative bg-black flex flex-col p-5 rounded-lg'
			style={{
				boxShadow: '0px 3px 42px -3px rgba(255, 255, 255, 0.1)',
			}}
		>
			<Input
				type='text'
				isEdit
				register={register('email')}
				placeholder='Email'
			/>
			{errors.email && <p className='text-red h-3'>{errors.email.message}</p>}

			<Input
				type='password'
				isEdit
				register={register('password')}
				placeholder='Пароль'
			/>
			{errors.password && (
				<p className='text-red h-3'>{errors.password.message}</p>
			)}

			<Button
				type='submit'
				loadingColor='white'
				isLoading={isSubmitting}
				className='bg-violet text-white my-2 p-1'
			>
				Авторизоваться
			</Button>
			<Link to={'/register'} className='text-violet block m-auto'>
				Зарегистрироваться
			</Link>
		</form>
	)
}

export default observer(LoginForm)
